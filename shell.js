/* Write it Down — shared app sidebar.
   Injects the left nav into any page with <body data-chrome="app" data-page="…">.
   Keeps every app page's chrome identical; page content stays editable HTML. */
(function () {
  function build() {
    var shell = document.querySelector('.wd-shell');
    if (!shell) return;
    var page = document.body.getAttribute('data-page') || '';
    var base = document.body.getAttribute('data-base') || '';

    var I = {
      desk:  '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
      rooms: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      feed:  '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
      store: '<path d="M2 7l1.5-3.5A1 1 0 0 1 4.4 3h15.2a1 1 0 0 1 .9.5L22 7"/><path d="M2 7h20v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M4 10v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10"/>',
      authors:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      events:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
      games:'<rect x="2" y="6" width="20" height="12" rx="6"/><path d="M7 12h2M8 11v2"/><circle cx="16" cy="11" r=".6" fill="currentColor"/><circle cx="18" cy="13" r=".6" fill="currentColor"/>',
      listen:'<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z"/>',
      faq:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
      plus:  '<path d="M12 5v14M5 12h14"/>'
    };
    function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }

    var nav = [
      { id: 'desk',    label: 'Mi escritorio', href: 'desk.html' },
      { id: 'rooms',   label: 'Salas de escritura', href: 'rooms.html' },
      { id: 'feed',    label: 'El feed',       href: 'feed.html' },
      { id: 'store',   label: 'Tienda de libros', href: 'store.html' },
      { id: 'authors', label: 'Autores',       href: 'authors.html' },
      { id: 'events',  label: 'Cursos y eventos', href: 'events.html' },
      { id: 'games',   label: 'Juegos',        href: 'games.html' },
      { id: 'listen',  label: 'Escuchar',      href: 'listen.html' },
      { id: 'faq',     label: 'Preguntas frecuentes', href: 'faq.html' }
    ];

    var aside = document.createElement('aside');
    aside.className = 'wd-side';
    aside.innerHTML =
      '<a class="wd-side__brand" href="' + base + 'desk.html"><img src="' + base + 'assets/lr-badge.svg" alt=""><b>La Redacción</b></a>' +
      '<div class="wd-side__newwrap">' +
        '<button class="wd-btn wd-btn--primary wd-side__new" id="wdNewBtn" type="button">' + svg(I.plus) + 'Nueva entrada' +
          svg('<path d="M6 9l6 6 6-6"/>') + '</button>' +
        '<div class="wd-newmenu" id="wdNewMenu" hidden>' +
          '<a href="' + base + 'write-post.html">' + svg(I.feed) + '<span><b>Nota de blog</b><small>Gratis · desde 300 palabras</small></span></a>' +
          '<a href="' + base + 'write-book.html">' + svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>') + '<span><b>Libro</b><small>Premium · por entregas</small></span></a>' +
        '</div>' +
      '</div>' +
      '<div class="wd-navlbl">Escribe &amp; comparte</div>' +
      nav.map(function (n) {
        return '<a class="wd-nav' + (n.id === page ? ' is-active' : '') + '" href="' + base + n.href + '">' + svg(I[n.id]) + n.label + '</a>';
      }).join('') +
      '<a class="wd-side__foot" href="' + base + 'profile.html">' +
        '<img class="wd-av" src="' + base + 'assets/demo/avatar-luis.png" alt="" style="width:34px;height:34px;object-fit:cover;border-radius:50%">' +
        '<span class="who"><b>Luis Godínez <span class="wd-badge wd-badge--pro" style="padding:2px 7px">Pro</span></b><span>Ver perfil</span></span>' +
      '</a>' +
      '<a class="wd-nav" href="https://wa.me/529991080295?text=Necesito%20ayuda%20con%20La%20Redacción" target="_blank" rel="noopener">' +
        svg('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>') +
        'Soporte</a>' +
      '<a class="wd-nav wd-side__logout" href="' + base + 'index.html">' +
        svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>') +
        'Cerrar sesión</a>' +
      '<a class="wd-nav wd-side__exit" href="' + base + 'demo.html" style="color:var(--text-subtle)">' +
        svg('<path d="M19 12H5M11 6l-6 6 6 6"/>') +
        'Salir del demo</a>';

    shell.insertBefore(aside, shell.firstChild);

    // Menú de Nueva entrada (libro o blog)
    var nb = document.getElementById('wdNewBtn'), nm = document.getElementById('wdNewMenu');
    if (nb && nm) {
      nb.addEventListener('click', function (e) { e.stopPropagation(); nm.hidden = !nm.hidden; });
      document.addEventListener('click', function () { nm.hidden = true; });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
