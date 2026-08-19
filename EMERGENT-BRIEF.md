# Brief para emergent.sh — La Redacción Online

> Pega TODO el bloque "PROMPT PARA EMERGENT" en emergent.sh. Adjunta además, como
> referencia visual, los archivos de `site/` (las maquetas HTML) y el logo en `assets/`
> (`lr-badge.svg`, `lr-lockup-white.png`, `lr-lockup-dark.png`). Eso le da el diseño exacto.

---

## Qué adjuntar (referencia de diseño)
1. **Maquetas** (carpeta `site/`): index, feed, write-post, write-book, store, events, games,
   rooms, authors, profile, membresias, como-funciona. Son el aspecto y flujo exactos.
2. **Logo / marca** (`assets/`): `lr-badge.svg`, `lr-lockup-white.png`, `lr-lockup-dark.png`, `lr-icon.svg`.
3. **Paleta y tipos:** amarillo señal `#FFDE1A`, tinta `#141414`, papel `#FCFBF7`.
   Fuentes Google: **Archivo** (títulos), **Newsreader** (lectura), **Hanken Grotesk** (interfaz).

---

## PROMPT PARA EMERGENT (copia desde aquí ↓)

Construye y publica **"La Redacción Online"** (dominio laredaccion.biz), una plataforma web
de escritura independiente en **español**. Lema: "Escribiendo al mundo". Estética: amarillo
señal #FFDE1A sobre tinta casi negra #141414 y papel crema; títulos en Archivo, lectura en
Newsreader, interfaz en Hanken Grotesk. Usa las maquetas HTML adjuntas como referencia visual fiel.

### Concepto
Los autores publican **notas de blog gratis** y, con **membresía Premium**, publican y venden
**libros por entregas**. Hay tienda, eventos, juegos y gamificación. Abierta a todo el público
de habla hispana, incluido EE. UU.

### Roles y autenticación
- **Lector** (registro gratis): leer, seguir autores, comprar, comentar, jugar.
- **Autor** (gratis): además publica notas de blog.
- **Autor Premium** (suscripción): además publica/vende libros, vende físicos, crea cursos, gana puntos.
- Registro con: nombre, correo, contraseña, **teléfono/WhatsApp con selector de país**,
  **ciudad**, **fecha de nacimiento**. Login, recuperación de contraseña, cerrar sesión.

### Países y moneda
- Selector de código telefónico para Hispanoamérica + EE. UU.
- Detecta país del navegador; muestra precios en MXN con equivalente aproximado en moneda local
  (tasa configurable / API FX). Precio base de membresía: **$99 MXN/mes** o **$948 MXN/año (−20%)**.

### Funcionalidades
1. **Editor de notas:** título, subtítulo, **categoría** (Crónica, Ensayo, Ficción, Cuento, Poesía,
   No ficción, Opinión, Oficio, Entrevista, Reseña), foto de portada, cuerpo. **Mínimo 300 palabras
   para publicar**. **Pegar texto deshabilitado** (anti-plagio: bloquear paste y drop). Espacio
   publicitario opcional (imagen + enlace). Al publicar, +50 puntos (si Premium) y aparece en el feed.
2. **Editor de libros (Premium):** capítulos, **mínimo 5 capítulos de 555 palabras** para publicar,
   subir **portada y contraportada**, categoría/género, pegar deshabilitado. Asistente "Muse" con
   sugerencias de escritura. Al publicar, fija precio y muestra reparto.
3. **Feed:** pestañas Todos / Siguiendo / **Top 10 del mes** (ranking por vistas únicas).
   Tarjetas con autor, categoría, vistas únicas. Botones de **compartir** (WhatsApp, Facebook, X,
   Telegram, copiar enlace).
4. **Tienda de libros:** pestañas **Digitales** (vendidos por la plataforma) y **Físicos seminuevos**
   (mercado entre autores Premium, multivendedor, con estado y vendedor). Capítulo 1 gratis como gancho.
5. **Checkout** con **Stripe** y **Mercado Pago**. **La plataforma retiene el 22% de cada venta
   (digital y físico); ese 22% ya incluye la comisión de la pasarela.** El autor recibe el 78%.
   Mostrar el desglose al comprar y al fijar precio.
6. **Salas de escritura:** salas con **chat en vivo** (websockets), lista de presencia y **temporizador
   de sprint**. Cualquiera puede **crear una sala**.
7. **Cursos y eventos** (estilo agenda/Luma): listado por fecha, tipos curso/taller/encuentro, reserva
   de lugar, gratis o de pago; Premium puede **crear eventos**.
8. **Juegos:** sopa de letras y ahorcado funcionales. Ganar suma **puntos solo a Premium**.
9. **Gamificación (solo Premium):** puntos por vistas únicas, publicar y jugar; **cada punto vale
   $0.10 MXN**, canjeable como crédito/cupón en la tienda. Niveles e insignias.
10. **Autores:** directorio + seguir / siguiendo. Perfil de autor editable (foto, bio, géneros,
    WhatsApp, ciudad, nacimiento) con estadísticas (vistas únicas, seguidores, entradas).
11. **Páginas públicas:** Inicio, Cómo funciona, Membresía (con comparativa y toggle mensual/anual),
    Explorar (feed público). Redes en el encabezado: facebook.com/laredaccionmx,
    instagram.com/laredaccionmex, youtube.com/@laredacciononline.
12. Cada escrito muestra la leyenda: **"La leyenda de cada escrito es responsabilidad de quien lo escribe."**
13. **SEO**: títulos, meta descripción, slugs limpios, Open Graph, sitemap.

### Modelo de datos (orientativo)
- **User**(rol, nombre, email, hash, whatsapp, país, ciudad, nacimiento, premium:bool, puntos, nivel)
- **Post**(autor, título, subtítulo, categoría, cuerpo, portada, estado, vistasUnicas, fecha, anuncio)
- **Book**(autor, título, género, portada, contraportada, precio, capítulos[], publicado)
- **Order**(comprador, item, tipo, precio, comision22, netoAutor, método, fecha)
- **Room**(nombre, meta, anfitrión, duraciónSprint) + **Message**(sala, autor, texto, ts)
- **Event**(título, tipo, fecha, hora, lugar, precio, anfitrión, inscritos[])
- **Follow**(seguidor, seguido), **Point**(user, motivo, cantidad), **GameScore**(user, juego, puntos)

### Stack sugerido y publicación
- App full-stack (React + backend con base de datos y autenticación), pagos Stripe + Mercado Pago,
  chat en tiempo real (websockets). **Despliega/publica la app** y deja el panel de administración
  para gestionar usuarios, posts, libros, pedidos y eventos.
- Prepara **importación de autores y escritos por CSV** (campos del modelo User y Post).

(fin del prompt)

---

## Notas
- emergent.sh genera una **app full-stack real** (no WordPress). Si en cambio quieres ir por
  WordPress, usa el tema y la guía que ya están en `wp-theme/` e `INSTALAR-V1.md`.
- Tras generar, revisa: registro+login, cobro en modo prueba, publicar nota→feed, sala con chat,
  y el reparto 22%/78% en el checkout.
- El logo oficial y la paleta están en `assets/`; pásalos para que respete la identidad.
