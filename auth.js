// La Redacción · auth.js
// Conecta los formularios de "Entrar" y "Crear cuenta" con Supabase.
// Uso en cada página (después del script UMD de Supabase):
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
//   <script src="auth.js"></script>

const SUPABASE_URL = 'https://dhbsjgoxtggcdltxcwuk.supabase.co';
// Supabase → Project Settings → API Keys → "Publishable key" (o la "anon" legacy).
// ⚠️ NUNCA pongas aquí la "secret" / "service_role".
const SUPABASE_KEY = 'sb_publishable_1FvBGeRStbXACikujrD9zQ_OO0oQf3k';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.LR_SUPABASE = supabase;

const $ = (id) => document.getElementById(id);
const valor = (id) => ($(id)?.value ?? '').trim();

function mostrarMensaje(texto, esError = false) {
  const caja = $('auth-mensaje');
  if (!caja) return alert(texto);
  caja.textContent = texto;
  caja.style.color = esError ? '#b3261e' : 'inherit';
}

const ERRORES = {
  'Invalid login credentials': 'Correo o contraseña incorrectos.',
  'Email not confirmed': 'Confirma tu correo antes de entrar. Revisa tu bandeja.',
  'User already registered': 'Ya existe una cuenta con ese correo.',
  'Password should be at least 6 characters.': 'La contraseña debe tener al menos 6 caracteres.',
};
const traducir = (error) => ERRORES[error.message] ?? error.message;

// ---------- Crear cuenta ----------
async function registrar(evento) {
  evento?.preventDefault();
  const correo = valor('reg-correo');
  const password = valor('reg-password');
  const nombre = valor('reg-nombre');
  if (!nombre || !correo || !password) {
    return mostrarMensaje('Completa nombre de autor, correo y contraseña.', true);
  }

  const { error } = await supabase.auth.signUp({
    email: correo,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/app/',
      data: {
        nombre_autor: nombre,
        telefono: valor('reg-telefono'),
        ciudad: valor('reg-ciudad'),
        fecha_nacimiento: valor('reg-nacimiento'),
      },
    },
  });

  if (error) return mostrarMensaje(traducir(error), true);
  mostrarMensaje('Cuenta creada. Te enviamos un correo para confirmarla.');
}

// ---------- Entrar ----------
async function entrar(evento) {
  evento?.preventDefault();
  const { error } = await supabase.auth.signInWithPassword({
    email: valor('login-correo'),
    password: valor('login-password'),
  });
  if (error) return mostrarMensaje(traducir(error), true);
  mostrarMensaje('Bienvenido de vuelta.');
}

// ---------- Olvidé mi contraseña ----------
async function recuperar(evento) {
  evento?.preventDefault();
  const correo = valor('login-correo');
  if (!correo) return mostrarMensaje('Escribe tu correo y vuelve a tocar el enlace.', true);
  const { error } = await supabase.auth.resetPasswordForEmail(correo, {
    redirectTo: window.location.origin + '/app/nueva-contrasena.html',
  });
  if (error) return mostrarMensaje(traducir(error), true);
  mostrarMensaje('Te enviamos un enlace para cambiar tu contraseña.');
}

// ---------- Salir ----------
async function salir(evento) {
  evento?.preventDefault();
  await supabase.auth.signOut();
}

// ---------- Actualizar la cabecera según la sesión ----------
async function pintarSesion(sesion) {
  const conSesion = Boolean(sesion);
  document.querySelectorAll('[data-solo-invitado]').forEach((el) => (el.hidden = conSesion));
  document.querySelectorAll('[data-solo-usuario]').forEach((el) => (el.hidden = !conSesion));

  if (!conSesion) return;
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('nombre_autor, plan, puntos')
    .eq('id', sesion.user.id)
    .single();

  if ($('usuario-nombre') && perfil) $('usuario-nombre').textContent = perfil.nombre_autor;
  document.dispatchEvent(new CustomEvent('lr:sesion', { detail: { sesion, perfil } }));
}

// ---------- Conectar botones ----------
$('reg-enviar')?.addEventListener('click', registrar);
$('login-enviar')?.addEventListener('click', entrar);
$('btn-olvide')?.addEventListener('click', recuperar);
$('btn-salir')?.addEventListener('click', salir);

supabase.auth.onAuthStateChange((_evento, sesion) => {
  // setTimeout evita bloquear el cliente de Supabase dentro del callback
  setTimeout(() => pintarSesion(sesion), 0);
});
