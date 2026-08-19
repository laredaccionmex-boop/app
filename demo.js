/* La Redacción — capa de demo (entorno de pruebas)
   Guarda notas, pedidos y mensajes de sala en localStorage para que el
   prototipo funcione de extremo a extremo sin backend. */
(function () {
  var NS = 'lr_demo_';
  function read(k, def) { try { return JSON.parse(localStorage.getItem(NS + k)) || def; } catch (e) { return def; } }
  function write(k, v) { localStorage.setItem(NS + k, JSON.stringify(v)); }

  window.LRDemo = {
    /* ---- Notas ---- */
    notes: function () { return read('notes', []); },
    addNote: function (n) {
      var a = read('notes', []);
      n.id = 'n' + Date.now();
      n.date = Date.now();
      n.reads = 0;
      a.unshift(n);
      write('notes', a);
      // puntos del autor (solo demo)
      var p = read('points', 0) + 50;
      write('points', p);
      return n;
    },
    points: function () { return read('points', 0); },

    /* ---- Pedidos (tienda de prueba) ---- */
    orders: function () { return read('orders', []); },
    addOrder: function (o) {
      var a = read('orders', []);
      o.id = 'LR-' + String(Date.now()).slice(-6);
      o.date = Date.now();
      a.unshift(o);
      write('orders', a);
      return o;
    },

    /* ---- Mensajes de sala ---- */
    roomMsgs: function (room) { return read('room_' + room, []); },
    addRoomMsg: function (room, m) {
      var a = read('room_' + room, []);
      a.push(m);
      write('room_' + room, a);
      return m;
    },

    /* ---- util ---- */
    timeAgo: function (ts) {
      var s = Math.floor((Date.now() - ts) / 1000);
      if (s < 60) return 'hace un momento';
      var m = Math.floor(s / 60); if (m < 60) return 'hace ' + m + ' min';
      var h = Math.floor(m / 60); if (h < 24) return 'hace ' + h + ' h';
      var d = Math.floor(h / 24); if (d === 1) return 'ayer';
      return 'hace ' + d + ' días';
    },
    reset: function () {
      ['notes', 'points', 'orders'].forEach(function (k) { localStorage.removeItem(NS + k); });
      Object.keys(localStorage).filter(function (k) { return k.indexOf(NS + 'room_') === 0; }).forEach(function (k) { localStorage.removeItem(k); });
    }
  };
})();
