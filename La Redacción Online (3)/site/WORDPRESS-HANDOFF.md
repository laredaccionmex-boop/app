# La Redacción — Guía de implementación en WordPress

> Cómo llevar este diseño a tu instalación de WordPress en **Webempresa**, con el modelo
> **blog gratis / libro premium**, registro ampliado, tienda mixta (digital + físico seminuevo)
> y SEO. Pensado para que tú (o tu desarrollador) lo monten sin adivinar nada.

---

## 0. Seguridad primero
**Cambia la contraseña que compartiste en el chat.** Nadie debe iniciar sesión en tu hosting por ti.
Para el resto de esta guía solo necesitas tu propio acceso de administrador a `wp-admin`.

---

## 1. Pila recomendada (plugins)

| Necesidad | Plugin recomendado | Por qué |
|---|---|---|
| Membresía $99 MXN/mes (premium) | **MemberPress** | El más sólido para muros de pago y niveles. Maneja el "blog gratis / libro premium" con reglas de acceso. |
| Pagos | **Stripe** + **Mercado Pago** | MemberPress integra Stripe nativo; Mercado Pago vía su gateway oficial para WooCommerce/MemberPress. |
| Tienda (digital + físico) | **WooCommerce** | Vende libros digitales (producto descargable) y físicos seminuevos (producto físico con envío). |
| Vendedores múltiples (autores premium venden sus físicos) | **Dokan** o **WC Vendors** | Convierte la tienda en multivendedor: cada autor premium gestiona sus propios listados y envíos. |
| Campos de registro extra (WhatsApp, ciudad, nacimiento) | Campos personalizados de **MemberPress** (o **Profile Builder**) | Añade los 3 campos al alta sin tocar código. |
| SEO | **Yoast SEO** | Ya lo tienes elegido. Genera las fichas optimizadas de cada entrada. |

> **Alternativa sin MemberPress:** WooCommerce + **WooCommerce Memberships** + **Subscriptions**. Más caro en licencias pero todo bajo un mismo paraguas con Woo. Si vas a usar Woo igualmente para la tienda, esta ruta unifica todo.

---

## 2. Estructura de contenido

### Tipos de contenido
- **Entradas (posts)** = notas de blog → **gratis**, indexables por SEO. Categorías: Crónica, Ensayo, Ficción, Poesía, Oficio…
- **Libros** = **CPT "libro"** (custom post type) o producto WooCommerce. Recomendado: producto Woo digital, con el **capítulo 1 gratis** como contenido visible y el resto tras compra/membresía.
- **Libros físicos seminuevos** = producto WooCommerce **físico**, creado por el autor premium (vía Dokan), con peso/envío y estado (Como nuevo / Buen estado / Aceptable) como atributo.

### Roles
- **Suscriptor** → lector. Puede comentar, seguir, comprar.
- **Autor** (gratis) → publica entradas de blog.
- **Autor Premium** (membresía) → además publica libros y vende físicos. Mapea al nivel de MemberPress + rol de vendedor Dokan.

---

## 3. Mapa de páginas (diseño → WordPress)

| Archivo del diseño | Página / plantilla WP | Notas |
|---|---|---|
| `site/index.html` | **Front page** (Portada) | Hero + registro. El modal de registro se conecta al formulario de MemberPress/registro. |
| `site/como-funciona.html` | Página "Cómo funciona" | Contenido estático. |
| `site/membresias.html` | Página "Membresía" → **pricing de MemberPress** | Los botones llevan al checkout del nivel premium. Toggle mensual/anual = 2 planes en MemberPress. |
| `site/feed-publico.html` | **Home del blog / archivo** | Loop de entradas. Bandas "Gratis/Miembros" según acceso. |
| `site/store.html` | **Tienda WooCommerce** | Pestaña Digitales = categoría producto "Digital"; Físicos = categoría "Seminuevo" (multivendedor). |
| `site/authors.html` | Directorio de autores | Plugin de directorio o loop de usuarios con rol Autor. "Seguir" requiere plugin social (ver §6). |
| `site/desk.html`, `write-*.html`, etc. | Panel del autor | Área privada tras login (front-end del CPT/Woo o el editor de WP). |

---

## 4. Registro ampliado (los 3 campos nuevos)

En **MemberPress → Settings → Fields** (o Profile Builder) añade:

| Campo | Tipo | Slug sugerido | Obligatorio |
|---|---|---|---|
| Teléfono / WhatsApp | Texto (tel) | `whatsapp` | Sí |
| Ciudad | Texto | `ciudad` | Sí |
| Fecha de nacimiento | Fecha | `fecha_nacimiento` | Sí |

- Guarda el WhatsApp con prefijo internacional (el registro ya ofrece un **selector de país** con todos los países de habla hispana + EE. UU.) para poder enviar avisos por WhatsApp Business API.
- El diseño ya refleja estos campos en el modal de `index.html` y en `profile.html` (selector de código + ícono de WhatsApp).
- **Multipaís / moneda:** `site/locale.js` detecta el país del navegador, preselecciona el código telefónico y muestra el **equivalente aproximado en la moneda local** junto a los precios en MXN. En WordPress replícalo con un plugin de geolocalización de moneda (p. ej. **WooCommerce Multi-Currency / Aelia**) y conecta una tasa FX real; las tasas del `locale.js` son referenciales.

---

## 5. Modelo de ingresos y acceso (la regla central)

**Comisión de la plataforma: La Redacción retiene el 22% de TODO lo que se venda** (libros digitales y físicos seminuevos). Ese 22% **ya incluye** la comisión de la pasarela (Stripe / Mercado Pago) — no se cobra nada adicional al autor; absorbe la comisión del proveedor dentro de su margen. Configúralo así:
- **Libros digitales / membresía:** comisión de plataforma en MemberPress o en el reparto de WooCommerce.
- **Tienda multivendedor (físicos):** en **Dokan → Comisiones**, fija **22%** global para la plataforma; el resto va al autor.
- El diseño ya muestra este reparto en el diálogo de publicar libro (`write-book.html`) y en la tienda.

**Puntos / gamificación (solo autores Premium):** cada **vista única** y cada acción (publicar, ganar un juego) suma **puntos** a los autores **Premium**; **cada punto vale $0.10 MXN** y se canjea en la tienda. Jugar es gratis para todos, pero solo los Premium acumulan puntos. En WordPress se implementa con **myCred** o **GamiPress** (puntos, niveles, insignias) restringido al nivel Premium de MemberPress y enlazado a un cupón/crédito de WooCommerce para el canje.

En **MemberPress → Rules**:
1. **Entradas de blog** → acceso **público** (sin regla). Son el motor de SEO y tráfico.
2. **Libros (contenido completo)** → regla: *solo miembros del nivel Premium* (o compra individual vía Woo).
3. **Capítulo 1 de cada libro** → público, como gancho. Usa el bloque "contenido para no-miembros" de MemberPress.
4. **Publicar libros / vender físicos** → capacidad ligada al nivel Premium (rol de vendedor Dokan activado al suscribirse).

**Reglas de contenido (anti-plagio y responsabilidad):**
- Los editores del diseño **bloquean el pegado de texto** (todo se escribe directamente) y exigen **mínimos**: 300 palabras para una nota; 5 capítulos de 555 palabras para un libro. En WordPress se replica con validación en el formulario de envío (front-end) o un snippet en el editor.
- Cada escrito muestra la leyenda **“La leyenda de cada escrito es responsabilidad de quien lo escribe”** — añádela como aviso automático al pie de cada entrada/libro.

---

## 6. "Seguir autores", juegos y rankings (la barra lateral)
La barra lateral del panel incluye **Autores**, **Cursos y eventos**, **Juegos** y **Escuchar**, y el feed tiene una pestaña **Top 10 del mes**.
- **Seguir autores:** WordPress no lo trae nativo — usa **BuddyPress / BuddyBoss** (perfiles + seguir + feed de seguidos).
- **Cursos y eventos (estilo Luma):** **The Events Calendar** (+ Event Tickets para reservas de pago) o **Tutor LMS / LearnDash** para los cursos.
- **Juegos (sopa de letras, ahorcado):** son HTML/JS autocontenidos (`games.html`) — se incrustan tal cual en una página con un bloque HTML; al ganar, llaman a la API de puntos (myCred/GamiPress).
- **Top 10 del mes:** un loop ordenado por vistas (usa un contador como **Post Views Counter**) filtrado al mes en curso.

---

## 7. Tema: cómo entregar el diseño
Tres rutas según tu instalación actual en Webempresa:

- **A) Tema de bloques (recomendado, WP 6.x):** convierte cada HTML en *patrones de bloques* y plantillas FSE. Los estilos de `styles.css` se cargan como *theme.json* + CSS adicional. Más mantenible.
- **B) Page builder (Elementor/Divi):** si ya usas uno, replico las páginas como plantillas del builder. Rápido, sin código, pero menos fiel al pixel.
- **C) Tema hijo a medida:** un *child theme* que carga `styles.css` + `site.css` y usa estas HTML como plantillas PHP. Máxima fidelidad; requiere desarrollador.

> Dime cuál de las tres y preparo los archivos en ese formato. Para A o C necesito saber el **tema base** que tienes activo hoy.

---

## 8. Para empezar a subir tus autores y escritos (ya los tienes)

Orden recomendado para la primera carga:
1. **Instala y configura** los plugins (§1) y crea los **niveles de membresía** y **reglas** (§5) antes de importar — así cada contenido nace con el acceso correcto.
2. **Crea los autores como usuarios** con su rol (Autor / Autor Premium). Si son muchos, impórtalos con **Import Users from CSV**: una fila por autor con nombre, correo, WhatsApp, ciudad, fecha de nacimiento y rol.
3. **Sube los escritos:**
   - **Notas de blog** → como **Entradas**, asignando el autor real y su categoría. Para volumen, usa **WP All Import** (CSV/Excel → entradas) mapeando título, cuerpo, autor, categoría e imagen destacada.
   - **Libros** → como productos WooCommerce (digital) o CPT "libro", con portada/contraportada como imágenes y el capítulo 1 visible.
4. **Imágenes:** sube portadas/contraportadas y fotos de portada de nota a la Biblioteca de medios; en WP All Import puedes traerlas por URL.
5. **SEO:** con Yoast activo, revisa título, meta descripción y *slug* de cada entrada importada.
6. **Revisa el anti-plagio**: el bloqueo de pegado vive en el editor del front-end; contémplalo si los autores cargarán desde el panel.

**Lo que necesito de ti para prepararte la importación:** un **CSV/Excel** de autores (nombre, correo, rol) y otro de escritos (título, autor, tipo blog/libro, categoría, cuerpo o archivo, imagen). Con eso te dejo listas las plantillas de WP All Import.

---

## 9. Checklist de puesta en marcha
- [ ] Cambiar la contraseña expuesta.
- [ ] Confirmar WordPress.org auto-alojado en Webempresa (no .com).
- [ ] Instalar: MemberPress, WooCommerce, Dokan (o WC Vendors), Yoast, gateway Mercado Pago, myCred/GamiPress, The Events Calendar, BuddyPress.
- [ ] Crear los 2 niveles de membresía (mensual $99 / anual $948 MXN).
- [ ] Fijar comisión de plataforma **22%** (MemberPress/Woo + Dokan).
- [ ] Definir valor del punto: **$0.10 MXN** y el cupón de canje.
- [ ] Conectar Stripe y Mercado Pago en modo prueba.
- [ ] Crear los 3 campos de registro + selector de país y moneda multipaís.
- [ ] Definir reglas de acceso (blog público, libro premium, cap. 1 gratis).
- [ ] Categorías de producto: "Digital" y "Seminuevo".
- [ ] Importar autores (CSV) y escritos (WP All Import).
- [ ] Cargar el tema con el diseño (ruta A/B/C).

---

### Lo que necesito de ti para el siguiente paso
1. **Tema base** activo hoy en Webempresa y si usas Elementor/Divi.
2. Ruta de entrega elegida: **A (bloques)**, **B (builder)** o **C (tema hijo)**.
3. Confirmar plugins (¿MemberPress sí, o prefieres WooCommerce Memberships?).
4. Vector original del logo (SVG/AI) si lo tienes, para sustituir mis SVG por el oficial.
