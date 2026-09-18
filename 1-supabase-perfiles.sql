-- La Redacción · Paso 1: perfiles de autor
-- Pégalo en Supabase → SQL Editor → New query → Run

-- 1. Tabla de perfiles (un perfil por cada usuario registrado)
create table if not exists public.perfiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  nombre_autor     text not null,
  telefono         text,
  ciudad           text,
  fecha_nacimiento date,
  plan             text not null default 'gratis' check (plan in ('gratis', 'premium')),
  puntos           integer not null default 0,
  creado_en        timestamptz not null default now()
);

-- 2. Seguridad: nadie puede leer ni tocar perfiles ajenos
alter table public.perfiles enable row level security;

create policy "Cada quien ve su perfil"
  on public.perfiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Cada quien edita su perfil"
  on public.perfiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- El usuario solo puede cambiar sus datos personales.
-- "plan" y "puntos" solo los cambia el servidor (pagos, juegos), nunca el navegador.
revoke update on public.perfiles from authenticated;
grant update (nombre_autor, telefono, ciudad, fecha_nacimiento)
  on public.perfiles to authenticated;

-- 3. Crear el perfil automáticamente al registrarse
create or replace function public.crear_perfil_nuevo_usuario()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, nombre_autor, telefono, ciudad, fecha_nacimiento)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'nombre_autor', ''), 'Autor'),
    new.raw_user_meta_data ->> 'telefono',
    new.raw_user_meta_data ->> 'ciudad',
    nullif(new.raw_user_meta_data ->> 'fecha_nacimiento', '')::date
  );
  return new;
end;
$$;

drop trigger if exists al_registrar_usuario on auth.users;
create trigger al_registrar_usuario
  after insert on auth.users
  for each row execute function public.crear_perfil_nuevo_usuario();
