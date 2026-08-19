# Instalar La Redacción en WordPress — Paso a paso (Webempresa)

Guía sencilla, en orden. No necesitas programar. Tiempo aprox.: 1–2 horas la primera vez.

---

## PARTE 0 · Antes de empezar (10 min)
1. **Cambia la contraseña** que compartiste antes (por seguridad).
2. Entra a tu panel de **Webempresa** → busca tu sitio WordPress.
3. Activa una **copia de seguridad** (Webempresa → Copias) por si algo sale mal.
4. (Recomendado) Crea un **entorno de staging** (Webempresa → Staging) para probar sin tocar el sitio real. Si no, trabaja directo pero con la copia hecha.

---

## PARTE 1 · Entrar a WordPress (2 min)
1. En el navegador ve a **tudominio.com/wp-admin** (ej. laredaccion.biz/wp-admin).
2. Inicia sesión con tu usuario **administrador**.
3. Verás el **Escritorio** de WordPress (menú lateral negro a la izquierda).

---

## PARTE 2 · Subir el tema "La Redacción" (10 min)
> El tema es lo que le da el diseño (logo, colores, páginas). Ya lo tienes en la carpeta `wp-theme/laredaccion`.

1. **Comprime** la carpeta `laredaccion` en un **.zip**:
   - En tu computadora, clic derecho sobre la carpeta `laredaccion` → "Comprimir" / "Crear ZIP".
   - El archivo debe llamarse `laredaccion.zip` y al abrirlo debe verse `style.css`, `functions.php`, etc. directamente dentro.
2. En WordPress: **Apariencia → Temas → Añadir nuevo tema → Subir tema**.
3. Clic en **Elegir archivo** → selecciona `laredaccion.zip` → **Instalar ahora**.
4. Cuando termine, clic en **Activar**.
5. Abre tu dominio en otra pestaña: ya deberías ver el diseño amarillo/negro de La Redacción.

---

## PARTE 3 · Logo, redes y menú (15 min)
1. **Apariencia → Personalizar**.
2. **Identidad del sitio** → sube el **logo** (usa `assets/lr-lockup-white.png`) y el **ícono del sitio** (favicon: `assets/lr-badge.svg` o un PNG cuadrado).
3. En **Personalizar** busca la sección **"La Redacción — Redes"** y confirma:
   - Facebook: https://www.facebook.com/laredaccionmx
   - Instagram: https://www.instagram.com/laredaccionmex
   - YouTube: https://www.youtube.com/@laredacciononline
4. **Publicar** (botón azul arriba).
5. Crear el menú: **Apariencia → Menús → Crear menú nuevo** → nómbralo "Principal" →
   agrega las páginas (las creas en la Parte 4) → marca la ubicación **"Menú principal"** → **Guardar**.

---

## PARTE 4 · Crear las páginas (15 min)
> El contenido de estas páginas lo copias de las maquetas `site/como-funciona.html` y `site/membresias.html` (el texto).

1. **Páginas → Añadir nueva**. Crea estas, una por una (solo título y luego Publicar):
   - **Cómo funciona**
   - **Membresía**
   - **Explorar** (esta mostrará el feed/entradas)
2. Para "Cómo funciona" y "Membresía": pega el **texto** desde las maquetas y dale formato con bloques.
3. **Ajustes → Lectura**: en "Tu página de inicio muestra" puedes dejar **"Tus últimas entradas"**
   (así la home es el feed) o elegir una página estática. El tema ya trae una portada de bienvenida.

---

## PARTE 5 · Instalar los plugins (funcionalidad real) (20 min)
> Plugins = funciones que WordPress no trae solo (membresía, tienda, eventos…).
> **Plugins → Añadir nuevo**, busca cada uno, **Instalar** y **Activar**:

1. **MemberPress** (de pago) — membresía Premium y campos de registro. *(Alternativa gratis para empezar: "Paid Memberships Pro").*
2. **WooCommerce** (gratis) — la tienda de libros.
3. **Dokan** (gratis "Lite") — que cada autor Premium venda sus libros físicos.
4. **Yoast SEO** (gratis) — posicionamiento en Google.
5. **The Events Calendar** (gratis) — cursos y eventos.
6. **GamiPress** (gratis) — puntos e insignias (solo Premium).
7. **Post Views Counter** (gratis) — para el "Top 10 del mes".
8. **Mercado Pago** (gratis, su plugin oficial para WooCommerce) + **Stripe** (incluido en WooCommerce/MemberPress).

Tras activar WooCommerce y MemberPress te saldrán **asistentes**: síguelos (país México, moneda MXN).

---

## PARTE 6 · Configurar el dinero (20 min)
1. **MemberPress → Membresías → Añadir**: crea **"Premium mensual" ($99 MXN)** y **"Premium anual" ($948 MXN)**.
2. **MemberPress → Ajustes → Pagos**: conecta **Stripe** y **Mercado Pago** (empieza en **modo prueba**).
3. **Reglas de acceso (MemberPress → Reglas):**
   - Entradas de blog → **acceso público** (no crear regla).
   - Libros completos → **solo Premium**.
   - El primer capítulo → público (gancho).
4. **Comisión 22% (incluye pasarela):** en **Dokan → Ajustes → Comisiones** pon **22%** para la plataforma (el autor recibe 78%).
5. **Puntos:** en **GamiPress** crea el tipo de punto "Tinta", valor **$0.10 MXN**, y limita ganarlos al rol Premium. Conéctalo a un cupón de WooCommerce para canjear.

---

## PARTE 7 · Campos de registro (10 min)
1. **MemberPress → Ajustes → Campos → Añadir campo**, crea tres:
   - **WhatsApp** (tipo texto/teléfono)
   - **Ciudad** (texto)
   - **Fecha de nacimiento** (fecha)
2. Márcalos como **obligatorios**. Aparecerán en el formulario de registro.

---

## PARTE 8 · Subir tus autores y escritos (cuando los tengas)
1. Instala **"Import Users from CSV"** → importa tus autores (yo te puedo armar el CSV).
2. Instala **"WP All Import"** → sube las notas como Entradas y los libros como productos.
3. Sube portadas/contraportadas a **Medios**.

---

## PARTE 9 · Antes de publicar al mundo (10 min)
1. Prueba: **registro**, **login**, **comprar en modo prueba**, **publicar una nota** y verla en el feed.
2. Revisa en el **celular** que se vea bien.
3. **Webempresa → SSL**: activa el certificado (candado https) gratis.
4. Si trabajaste en staging, **pasa los cambios a producción** desde el panel de Webempresa.
5. ¡Listo! Comparte laredaccion.biz.

---

## Si te atoras
- **No veo el diseño tras activar el tema:** confirma que el .zip tenía `style.css` en la raíz (no dentro de otra subcarpeta).
- **El logo no aparece:** Apariencia → Personalizar → Identidad del sitio → subir logo.
- **No me deja cobrar:** revisa que Stripe/Mercado Pago estén en modo prueba y bien conectados.
- **Dónde está cada cosa:** menú lateral de WordPress: *Páginas, Entradas, Apariencia, Plugins, Ajustes, MemberPress, WooCommerce, Eventos*.

> Recomendación: haz una sección a la vez y guarda. Cuando termines la Parte 5, dime y te ayudo
> con la configuración fina (reglas de acceso, comisión y puntos) o te genero el CSV de autores.
