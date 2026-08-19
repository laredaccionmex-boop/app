# La Redacción — Instalar la v1 en WordPress (Webempresa)

> Ruta práctica para tener una **primera versión publicada y funcional** sin esperar
> al desarrollo del tema a medida. Idea clave: separa lo que ya puede vivir tal cual
> (páginas públicas) de lo que es funcionalidad nativa de WordPress (publicar, vender, miembros).

---

## ⚠️ Antes de nada
1. **Cambia la contraseña** que compartiste en el chat.
2. Haz un **backup** completo (Webempresa tiene copias; o el plugin **All-in-One WP Migration**).
3. Trabaja primero en **staging** (Webempresa lo ofrece desde su panel) y pasa a producción cuando esté bien.

---

## Qué es cada cosa (importante)
- **Lo estático que diseñamos** (`site/*.html`, CSS, JS) = **maqueta visual de alta fidelidad**. Sirve como guía de diseño y para las páginas públicas.
- **Lo funcional** (registro real, cobros, publicar notas/libros, miembros, puntos) = se construye con **WordPress + plugins**. Los editores con anti-pegado, contador de palabras, etc. son el *objetivo de diseño*; se reimplementan como formularios/funciones de WP, no se "suben" como HTML.

> Para la **v1** lo más rápido y estable es: páginas públicas con el diseño + autores publicando desde el **panel propio de WordPress**. La experiencia de editor a medida (Muse, anti-plagio, mínimos de palabras) entra en una v2.

---

## Paso a paso de la v1

### 1) Plugins base (Plugins → Añadir nuevo)
- **MemberPress** — membresía Premium ($99/mes) y reglas de acceso.
- **WooCommerce** — tienda (libros digitales y físicos).
- **Dokan** (Lite para empezar) — que cada autor Premium venda sus físicos.
- **Yoast SEO** — SEO de cada entrada.
- **The Events Calendar** — cursos y eventos (estilo Luma).
- **myCred** o **GamiPress** — puntos (solo Premium).
- Pasarelas: **Stripe** (incluido en MemberPress/Woo) y **Mercado Pago para WooCommerce**.

### 2) Tema y diseño
Elige UNA ruta (de más fácil a más fiel):
- **A — Page builder (recomendado para v1):** instala **Elementor** (o el que ya uses) y recrea las páginas públicas copiando textos y estilos del diseño: *Inicio, Cómo funciona, Membresía, Tienda, Explorar*. Rápido, sin código.
- **B — Tema de bloques:** usa un tema FSE (p. ej. Twenty Twenty-Four) y arma las páginas con bloques + CSS adicional (pego los colores/tipos del sistema en *Apariencia → Personalizar → CSS adicional*).
- **C — Tema hijo a medida:** un desarrollador convierte las HTML en plantillas PHP. Máxima fidelidad; es lo de la v2.

Los **colores y tipografías** de la marca (amarillo #FFDE1A, tinta #141414, Archivo/Newsreader/Hanken) los pasas al builder o a *CSS adicional*. El **logo/isotipo** están en `assets/lr-*.svg`.

### 3) Estructura de contenido
- **Notas de blog** → *Entradas*. Crea las **categorías** (Crónica, Ensayo, Ficción, Cuento, Poesía, No ficción, Opinión, Oficio, Entrevista, Reseña).
- **Libros** → productos de WooCommerce: *Digital* (descargable) y *Seminuevo* (físico, con envío). Crea esas 2 categorías de producto.
- **Capítulo 1 gratis**: publícalo visible; el resto detrás de compra/membresía.

### 4) Membresía y dinero
- En **MemberPress** crea 2 planes: **Mensual $99 MXN** y **Anual $948 MXN**.
- **Comisión 22% (incluye pasarela):** en **Dokan → Comisiones** pon 22% para la plataforma; el resto al autor.
- **Reglas de acceso (MemberPress → Rules):** blog = público; libro completo = solo Premium; publicar/vender = capacidad Premium.
- **Puntos (solo Premium):** en myCred/GamiPress limita la ganancia de puntos al nivel Premium; 1 punto = $0.10 MXN canjeable como cupón.

### 5) Registro con tus campos
En **MemberPress → Ajustes → Campos** añade: **WhatsApp** (con país), **Ciudad**, **Fecha de nacimiento**. Para país/moneda usa un plugin de multidivisa (p. ej. **Aelia/WooCommerce Multi-Currency**).

### 6) Subir tus autores y escritos (ya los tienes)
1. Crea los autores como **usuarios** con rol Autor / Autor Premium → plugin **Import Users from CSV**.
2. Sube las notas como **Entradas** y libros como **productos** → **WP All Import** (mapeas título, autor, categoría, cuerpo, imagen).
3. Sube portadas/contraportadas a la **Biblioteca de medios**.
4. Revisa SEO con Yoast.

> Te puedo generar las **plantillas CSV** (autores y escritos) listas para importar — solo dímelo.

### 7) SEO, redes y legal
- Conecta las redes (ya están en el diseño): facebook.com/laredaccionmx, instagram.com/laredaccionmex, youtube.com/@laredacciononline.
- Añade el aviso **"La leyenda de cada escrito es responsabilidad de quien lo escribe"** al pie de entradas/libros.
- Páginas legales: Términos, Aviso de privacidad (obligatorio para cobros).

### 8) Antes de publicar
- Prueba registro + pago en **modo prueba** (Stripe/Mercado Pago test).
- Revisa en móvil.
- Apunta el dominio **laredaccion.biz** y activa **SSL** (Webempresa lo da gratis).
- Pasa de staging a producción.

---

## Resumen honesto
- **v1 (rápida):** páginas públicas con el diseño + WooCommerce/MemberPress + autores publicando desde WordPress. Funciona de verdad: registro, cobros, tienda, blog, eventos.
- **v2:** el editor a medida (Muse, anti-pegado, mínimos de palabras, gamificación en pantalla) como tema/plugin propio, recreando fielmente estas maquetas.

**Lo que necesito de ti para ayudarte con el siguiente paso:** (1) ¿qué ruta de diseño eliges (A/B/C)?, (2) ¿quieres que te genere los **CSV de autores y escritos**?, (3) ¿tema actual activo en Webempresa?
