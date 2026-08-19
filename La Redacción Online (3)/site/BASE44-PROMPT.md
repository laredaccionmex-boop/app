# Prompt para Base44 — La Redacción Online

> Pega el bloque de abajo en el cuadro de Base44 ("Write what you want…") y pulsa Build now.
> Cuando Base44 lo permita, adjunta la carpeta `export/emergent` (logos + maquetas) como referencia visual.

---

Build a full-stack Spanish-language web platform called **"La Redacción Online"** (slogan: "Escribiendo al mundo"). It is a community where Spanish-speaking authors publish blog posts for free and sell their books with a paid membership. Use a brand style of signal yellow (#FFDE1A) on near-black ink (#141414) over warm cream (#FCFBF7); display font Archivo, reading font Newsreader, UI font Hanken Grotesk.

## User roles & auth
- **Reader** (free): read, follow authors, comment, buy, play games.
- **Author** (free): everything above + publish blog posts.
- **Premium Author** (paid subscription): + publish/sell books, sell used physical books, create courses, earn points.
- Sign up with: name, email, password, WhatsApp phone with country selector, city, date of birth. Include login, password recovery, logout.

## Pages / screens
1. **Landing** — value prop, how it works, pricing, FAQ, social links (Facebook/Instagram/YouTube), sign-up CTA.
2. **Feed** — latest posts; tabs: All / Following / Top 10 of the month (by unique views). Share buttons (WhatsApp, Facebook, X, Telegram, copy link).
3. **Write post editor** — title, subtitle, category (Crónica, Ensayo, Ficción, Cuento, Poesía, No ficción, Opinión, Oficio, Entrevista, Reseña), cover photo. Minimum 300 words to publish. Paste disabled (anti-plagiarism). Optional ad slot (image + link).
4. **Write book editor (Premium)** — chapters; minimum 5 chapters of 555 words each to publish; upload front and back cover; writing assistant "Muse"; set price on publish.
5. **Bookstore** — tabs Digital (sold by platform) and Used physical (peer marketplace between Premium authors). Chapter 1 free as a teaser. Used-book mailbox to register books for sale; shipping $88 MXN per 2 books.
6. **Checkout** — Stripe + Mercado Pago. Platform keeps **22% of every sale** (digital and physical); that 22% already includes the payment-gateway fee. Author receives 78%. Show the split.
7. **Writing rooms** — live chat rooms with presence + sprint timer; anyone can create a room.
8. **Courses & events** — agenda-style listing with seat reservation; paid events go through checkout; Premium can create events.
9. **Games** — word search and hangman; winning earns points (Premium only).
10. **Authors** — directory, follow/unfollow, public author profile (editable own profile: photo, cover photo, bio, genres, WhatsApp, city, birth date) with stats (unique views, followers, posts), their books and achievements.
11. **Membership** — Free vs Premium ($99 MXN/month or $948/year, −20%), comparison table, monthly/annual toggle with local-currency equivalent.
12. **Listen** — podcast section where episodes are added by URL (Spotify/YouTube).

## Money & gamification
- Membership $99 MXN/month. Platform commission 22% (includes gateway), author gets 78%.
- **Points (Premium only):** earned from unique views, publishing and games; 1 point = $0.10 MXN, redeemable as store credit. Levels and badges.

## Geography & currency
- Open to all Spanish-speaking countries + USA. Detect browser country; show prices in local currency; phone country-code selector.

## Other
- Every piece of writing shows the notice: "La leyenda de cada escrito es responsabilidad de quien lo escribe."
- SEO: clean titles, meta descriptions, slugs, Open Graph, sitemap. Include an admin panel and CSV import for authors and posts. Publish the app when done.

---

## Notas (no pegar)
- Base44 genera una **app nueva**; no reutiliza el código que ya hicimos. Toma las maquetas solo como guía visual.
- Es un camino paralelo al de WordPress: elige uno para no dividir esfuerzos.
- Tras generar, prueba: registro/login, cobro de prueba, publicar nota→feed, sala con chat, reparto 22%/78%.
