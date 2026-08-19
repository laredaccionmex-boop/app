/* La Redacción — localización por país del navegador
   - Países de habla hispana + Estados Unidos.
   - Rellena los selectores de código telefónico (.lr-dial).
   - Detecta país/idioma del navegador para preseleccionar país y moneda.
   - Convierte precios marcados con [data-mxn] a la moneda local (estimado).
   NOTA: las tasas son referenciales; en producción conéctalas a un feed FX (p. ej. open.er-api.com) y cachéalas a diario. */
(function () {
  // país: { nombre, código tel, moneda, símbolo, 1 MXN = rate <moneda> }
  var C = {
    MX: { n: 'México',              dial: '52',  cur: 'MXN', sym: '$',    rate: 1 },
    US: { n: 'Estados Unidos',      dial: '1',   cur: 'USD', sym: 'US$',  rate: 0.058 },
    ES: { n: 'España',              dial: '34',  cur: 'EUR', sym: '€',    rate: 0.054 },
    AR: { n: 'Argentina',           dial: '54',  cur: 'ARS', sym: 'AR$',  rate: 52 },
    CO: { n: 'Colombia',            dial: '57',  cur: 'COP', sym: 'COP ', rate: 235 },
    CL: { n: 'Chile',               dial: '56',  cur: 'CLP', sym: 'CLP ', rate: 55 },
    PE: { n: 'Perú',                dial: '51',  cur: 'PEN', sym: 'S/ ',  rate: 0.22 },
    VE: { n: 'Venezuela',           dial: '58',  cur: 'USD', sym: 'US$',  rate: 0.058 },
    EC: { n: 'Ecuador',             dial: '593', cur: 'USD', sym: 'US$',  rate: 0.058 },
    GT: { n: 'Guatemala',           dial: '502', cur: 'GTQ', sym: 'Q',    rate: 0.45 },
    CU: { n: 'Cuba',                dial: '53',  cur: 'USD', sym: 'US$',  rate: 0.058 },
    BO: { n: 'Bolivia',             dial: '591', cur: 'BOB', sym: 'Bs ',  rate: 0.40 },
    DO: { n: 'Rep. Dominicana',     dial: '1',   cur: 'DOP', sym: 'RD$',  rate: 3.5 },
    HN: { n: 'Honduras',            dial: '504', cur: 'HNL', sym: 'L ',   rate: 1.45 },
    PY: { n: 'Paraguay',            dial: '595', cur: 'PYG', sym: '₲ ',   rate: 440 },
    SV: { n: 'El Salvador',         dial: '503', cur: 'USD', sym: 'US$',  rate: 0.058 },
    NI: { n: 'Nicaragua',           dial: '505', cur: 'NIO', sym: 'C$',   rate: 0.21 },
    CR: { n: 'Costa Rica',          dial: '506', cur: 'CRC', sym: '₡',    rate: 30 },
    PA: { n: 'Panamá',              dial: '507', cur: 'USD', sym: 'US$',  rate: 0.058 },
    UY: { n: 'Uruguay',             dial: '598', cur: 'UYU', sym: '$U ',  rate: 2.3 },
    PR: { n: 'Puerto Rico',         dial: '1',   cur: 'USD', sym: 'US$',  rate: 0.058 }
  };
  var ORDER = ['MX','US','ES','AR','CO','CL','PE','VE','EC','GT','CU','BO','DO','HN','PY','SV','NI','CR','PA','UY','PR'];

  // Detecta país del navegador
  function detect() {
    try {
      var reg = (Intl.DateTimeFormat().resolvedOptions().locale || navigator.language || 'es-MX').split('-')[1];
      if (reg && C[reg.toUpperCase()]) return reg.toUpperCase();
      var lang = (navigator.language || 'es-MX').toUpperCase();
      for (var k in C) if (lang.indexOf('-' + k) > -1) return k;
    } catch (e) {}
    return 'MX';
  }

  var country = detect();
  var L = C[country];
  window.LR_LOCALE = { country: country, dial: L.dial, currency: L.cur, symbol: L.sym, rate: L.rate, table: C };

  function fmt(n) {
    if (n >= 100) return Math.round(n).toLocaleString('es');
    return (Math.round(n * 100) / 100).toLocaleString('es', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function fillDials() {
    document.querySelectorAll('.lr-dial').forEach(function (sel) {
      if (sel.dataset.filled) return;
      sel.dataset.filled = '1';
      sel.innerHTML = ORDER.map(function (k) {
        return '<option value="' + C[k].dial + '"' + (k === country ? ' selected' : '') + '>' + flag(k) + ' +' + C[k].dial + '</option>';
      }).join('');
    });
  }
  function flag(cc) { // emoji bandera desde código ISO
    return cc.replace(/./g, function (c) { return String.fromCodePoint(127397 + c.charCodeAt(0)); });
  }

  // Convierte precios marcados con data-mxn (valor en MXN) → moneda local
  function localizePrices() {
    if (country === 'MX') return; // base
    document.querySelectorAll('[data-mxn]').forEach(function (el) {
      if (el.dataset.localized) return;
      el.dataset.localized = '1';
      var mxn = parseFloat(el.getAttribute('data-mxn')) || 0;
      var local = mxn * L.rate;
      var note = document.createElement('small');
      note.className = 'lr-localnote';
      note.style.cssText = 'display:block;font-size:.72em;font-weight:500;color:var(--text-subtle);margin-top:2px;';
      note.textContent = '≈ ' + L.sym + fmt(local) + ' ' + L.cur;
      el.insertAdjacentElement('afterend', note);
    });
  }

  function run() { fillDials(); localizePrices(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
