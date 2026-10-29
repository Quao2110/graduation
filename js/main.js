/* ===== Thư mời của Thanh Huyền — hành trình dạo vườn ngày tốt nghiệp: cuộn dọc để cảnh trôi ngang nhiều lớp,
   cáo con đi cùng, tên tụ lại từ đom đóm và bướm, sao lấp lánh, pháo đom đóm ở chặng cuối ===== */
(function () {
  'use strict';
  /* ---------- thông tin buổi lễ: sửa ở đây (giờ UTC = giờ Việt Nam − 7) ---------- */
  var EVENT = {
    start: Date.UTC(2026, 10, 7, 5, 30, 0),  // 12h30 giờ Việt Nam
    end: Date.UTC(2026, 10, 7, 10, 0, 0),    // 17h00 giờ Việt Nam
    title: 'Lễ tốt nghiệp của Thanh Huyền',
    place: '[Tên địa điểm], [Địa chỉ]'
  };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var BCOLORS = ['#FF8FC8', '#B79CFF', '#7FD8F2', '#FFC46B', '#8FE3B0', '#FFB0D8'];
  var TWINKLE = ['#FFFFFF', '#FFE58A', '#9FF0FF', '#FFB3E0', '#D4B8FF'];
  var PETALS = ['#F7C6D3', '#F2A7BC', '#FFF4F0', '#FBD9C4', '#E9D8F0'];
  var NAME_FONT = '"Lora",Georgia,serif';
  var LINES = [{ t: 'Trương Thị', s: 124, y: 150 }, { t: 'Thanh Huyền', s: 150, y: 310 }];

  var journey = $('#journey'), stage = $('#stage'), track = $('#track'), skyTrack = $('#skyTrack'), anchor = $('#nameAnchor'),
      companion = $('#companion'), hint = $('#scrollHint'), dots = $$('#chapters button'), bgs = $$('.bg', stage), N = dots.length;

  /* ---------- cảnh nền lặp, thú nhỏ, bướm ---------- */
  var tiles = window.SceneTiles || {};
  bgs.forEach(function (b) {
    var k = b.classList.contains('far') ? 'far' : b.classList.contains('mid') ? 'mid' : b.classList.contains('near') ? 'near' : 'fg';
    if (tiles[k]) b.style.backgroundImage = 'url("' + tiles[k] + '")';
    b._speed = parseFloat(b.dataset.speed) || 1;
  });
  $$('.critter[data-kind]').forEach(function (c) {
    c.innerHTML = (window.CritterArt || {})[c.dataset.kind] || '';
    $$('.cr-eye', c).forEach(function (e) { e.style.animationDelay = (-rand(0, 4)).toFixed(2) + 's'; });
  });
  var BFLY = '<span class="bf-fly"><span class="bf-tilt"><svg class="wing l" viewBox="0 0 50 100"><use href="#bWing"/></svg>' +
    '<svg class="wing r" viewBox="0 0 50 100"><use href="#bWing" transform="matrix(-1 0 0 1 50 0)"/></svg>' +
    '<svg class="bf-body" viewBox="0 0 20 100"><use href="#bBody"/></svg></span></span>';
  $$('.bfly').forEach(function (b) { if (!b.firstChild) b.innerHTML = BFLY; b.style.setProperty('--fl', rand(0.26, 0.42).toFixed(2) + 's'); });

  /* ---------- khung ảnh: bấm để thử ảnh (không lưu lại, tải lại trang là mất) ---------- */
  var CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.6"/></svg>';
  function shrink(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var k = Math.min(1, 1100 / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        res(c.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error('Không đọc được ảnh')); };
      img.src = url;
    });
  }
  $$('.photo-slot').forEach(function (slot) {
    var id = 'ph-' + slot.dataset.slot, label = slot.dataset.label;
    if (slot.dataset.src) {
      /* khung đã có ảnh chính thức: hiển thị cố định, không cho đổi */
      var box = document.createElement('span'); box.className = slot.className + ' has-img fixed';
      Array.prototype.forEach.call(slot.attributes, function (a) { if (a.name !== 'class' && a.name !== 'for') box.setAttribute(a.name, a.value); });
      var pic = new Image(); pic.alt = label; pic.decoding = 'async';
      if (slot.dataset.slot !== 'chan-dung') pic.loading = 'lazy';
      if (slot.dataset.pos) pic.style.objectPosition = slot.dataset.pos;
      pic.onload = function () { pic.classList.add('ok'); };
      pic.src = slot.dataset.src;
      box.appendChild(pic);
      slot.parentNode.replaceChild(box, slot);
      return;
    }
    slot.innerHTML = '<input type="file" accept="image/*" id="' + id + '" aria-label="Chọn ' + label + '">' +
      '<span class="ph-empty">' + CAM + '<b>Thêm ảnh</b><small>' + label + '</small></span>' +
      '<img alt="' + label + '" hidden><span class="ph-change" aria-hidden="true">Đổi ảnh</span>';
    var input = slot.querySelector('input'), img = slot.querySelector('img');
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f) return;
      shrink(f).then(function (data) { img.src = data; img.hidden = false; slot.classList.add('has-img'); }).catch(function () {});
      input.value = '';
    });
  });

  /* ---------- canvas: mọi toạ độ tính theo khung nhìn vì sân khấu dính cố định ---------- */
  var sky = $('#sky'), sctx = sky.getContext('2d'), fx = $('#fx'), fctx = fx.getContext('2d');
  var W = 0, H = 0, DPR = 1, pollen = [], twinkles = [], petals = [], fxParts = [], glows = [];
  function sparkPath(ctx, x, y, r) {
    var k = r * 0.2;
    ctx.beginPath(); ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x + k, y - k, x + r, y); ctx.quadraticCurveTo(x + k, y + k, x, y + r);
    ctx.quadraticCurveTo(x - k, y + k, x - r, y); ctx.quadraticCurveTo(x - k, y - k, x, y - r); ctx.closePath();
  }
  function petalPath(ctx, x, y, r, rot, flip) {
    var c = Math.cos(rot), s = Math.sin(rot), fy = Math.max(0.18, Math.abs(flip));
    ctx.beginPath();
    for (var i = 0; i <= 16; i++) {
      var a = i / 16 * 6.283, px = Math.cos(a) * r, py = Math.sin(a) * r * 0.55 * (Math.cos(a) > 0 ? 1 - Math.cos(a) * 0.45 : 1) * fy;
      var X = x + px * c - py * s, Y = y + px * s + py * c;
      if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
    }
    ctx.closePath();
  }
  /* quầng sáng đom đóm: vàng, xanh ngọc, hồng, tím, xanh lá */
  function makeGlow(c0, c1) {
    var cv = document.createElement('canvas'); cv.width = cv.height = 64;
    var g = cv.getContext('2d'), rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.22, c0); rg.addColorStop(0.55, c1); rg.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return cv;
  }
  var GLOWS = [makeGlow('rgba(255,236,170,.9)', 'rgba(255,200,110,.3)'), makeGlow('rgba(170,240,255,.9)', 'rgba(90,200,255,.3)'),
    makeGlow('rgba(255,190,230,.9)', 'rgba(255,110,190,.3)'), makeGlow('rgba(215,190,255,.9)', 'rgba(160,110,255,.3)'), makeGlow('rgba(200,255,200,.9)', 'rgba(110,230,140,.3)')];
  function anyGlow() { return (Math.random() * GLOWS.length) | 0; }

  function makeSky() {
    pollen = []; twinkles = []; petals = [];
    for (var i = 0, c = clamp(Math.round(W * H / 14000), 30, 120); i < c; i++) {
      pollen.push({ x: Math.random() * W, y: Math.random() * H * 0.85, r: Math.random() < 0.15 ? rand(3, 5.5) : rand(0.8, 2.2), ph: Math.random() * 6.28, sp: rand(0.6, 2), d: rand(0.04, 0.2), g: GLOWS[i % 5] });
    }
    for (var k = 0, tc = clamp(Math.round(W * H / 24000), 18, 80); k < tc; k++) {
      var ci = (Math.random() * TWINKLE.length) | 0;
      twinkles.push({ x: Math.random() * W, y: Math.random() * H * 0.7, r: rand(3, 9), ph: Math.random() * 6.28, sp: rand(1.2, 3.4), d: rand(0.02, 0.1), c: TWINKLE[ci], g: GLOWS[ci % 5] });
    }
    for (var j = 0, pc = clamp(Math.round(W * H / 50000), 8, 30); j < pc; j++) {
      petals.push({ x: Math.random() * W, y: Math.random() * H, r: rand(5, 10), vy: rand(0.3, 0.8), sw: rand(0.4, 1.2), ph: Math.random() * 6.28, rot: Math.random() * 6.28, vr: rand(-0.02, 0.02), fl: rand(1.2, 2.6), c: PETALS[j % 5] });
    }
  }
  function addPart(x, y, opt) {
    if (fxParts.length > 700) fxParts.shift();
    opt = opt || {};
    var a = opt.a != null ? opt.a : Math.random() * 6.28, sp = opt.sp != null ? opt.sp : rand(0.2, 1.4);
    fxParts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (opt.up || 0), g: opt.g != null ? opt.g : 0.02,
      life: 0, max: opt.max || rand(500, 1000), r: opt.r || rand(2, 5), c: opt.c || TWINKLE[(Math.random() * 5) | 0] });
  }
  function stepParts(dt) {
    for (var i = fxParts.length - 1; i >= 0; i--) {
      var p = fxParts[i];
      p.life += dt;
      if (p.life >= p.max) { fxParts.splice(i, 1); continue; }
      var f = dt / 16.67;
      p.x += p.vx * f; p.y += p.vy * f; p.vy += p.g * f; p.vx *= 0.985;
      var t = p.life / p.max, s = p.r * (t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8 * 0.9);
      fctx.globalAlpha = 1 - t * t; fctx.fillStyle = p.c;
      sparkPath(fctx, p.x, p.y, Math.max(0.3, s)); fctx.fill();
    }
    fctx.globalAlpha = 1;
  }
  function addGlow(x, y, opt) {
    if (reduce || glows.length > 420) return;
    opt = opt || {};
    var a = opt.a != null ? opt.a : rand(0, 6.283), sp = opt.sp != null ? opt.sp : rand(0.05, 0.4);
    glows.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (opt.up != null ? opt.up : 0.35), life: -(opt.delay || 0),
      max: opt.max || rand(1800, 3600), r: opt.r || rand(6, 16), img: GLOWS[opt.img != null ? opt.img : anyGlow()] });
  }
  function drawGlows(dt) {
    fctx.globalCompositeOperation = 'lighter';
    for (var i = glows.length - 1; i >= 0; i--) {
      var p = glows[i];
      p.life += dt;
      if (p.life < 0) continue;
      if (p.life >= p.max) { glows.splice(i, 1); continue; }
      var f = dt / 16.67; p.x += p.vx * f; p.y += p.vy * f; p.vx *= 0.995;
      var t = p.life / p.max, r = p.r * (0.7 + 0.3 * Math.sin(p.life / 300));
      fctx.globalAlpha = Math.sin(Math.PI * t) * 0.9;
      fctx.drawImage(p.img, (p.x - r) * DPR, (p.y - r) * DPR, r * 2 * DPR, r * 2 * DPR);
    }
    fctx.globalAlpha = 1; fctx.globalCompositeOperation = 'source-over';
  }
  function wrapX(x, shift) { return ((x - shift) % W + W) % W; }
  function drawSky(t, dt) {
    sctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    sctx.clearRect(0, 0, W, H);
    sctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < pollen.length; i++) {
      var s = pollen[i], a = reduce ? 0.8 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
      var x = wrapX(s.x + (reduce ? 0 : Math.sin(t * s.sp * 0.5 + s.ph) * 8), trackX * s.d), y = s.y + (reduce ? 0 : Math.sin(t * 0.3 + s.ph) * 10);
      sctx.globalAlpha = a;
      if (s.r > 3) { var gr = s.r * 3.2 * (0.7 + 0.3 * a); sctx.drawImage(s.g, x - gr, y - gr, gr * 2, gr * 2); }
      else { sctx.fillStyle = '#FFF4D0'; sctx.beginPath(); sctx.arc(x, y, s.r, 0, 6.283); sctx.fill(); }
    }
    /* sao bốn cánh chớp sáng */
    for (var w = 0; w < twinkles.length; w++) {
      var tw = twinkles[w], ta = reduce ? 0.6 : Math.pow(Math.max(0, Math.sin(t * tw.sp + tw.ph)), 6);
      if (ta < 0.03) continue;
      var tx = wrapX(tw.x, trackX * tw.d), tr = tw.r * (0.5 + ta);
      sctx.globalAlpha = ta * 0.8; sctx.drawImage(tw.g, tx - tr * 2.4, tw.y - tr * 2.4, tr * 4.8, tr * 4.8);
      sctx.globalAlpha = ta; sctx.fillStyle = tw.c; sparkPath(sctx, tx, tw.y, tr); sctx.fill();
    }
    sctx.globalCompositeOperation = 'source-over';
    /* cánh hoa rơi chậm, vừa xoay vừa lật */
    var f0 = dt / 16.67;
    for (var k = 0; k < petals.length; k++) {
      var q = petals[k];
      if (!reduce) { q.y += q.vy * f0; q.x += Math.sin(t * q.sw + q.ph) * 0.6 * f0; q.rot += q.vr * f0; }
      if (q.y > H + 20) { q.y = -20; q.x = Math.random() * W; }
      sctx.globalAlpha = 0.8; sctx.fillStyle = q.c;
      petalPath(sctx, wrapX(q.x, trackX * 0.5), q.y, q.r, q.rot, reduce ? 1 : Math.cos(t * q.fl + q.ph));
      sctx.fill();
    }
    sctx.globalAlpha = 1;
  }

  /* ---------- tên tụ lại từ đom đóm và bướm ---------- */
  var state = 'idle', L = null, minis = [], flyStart = 0, flyEnd = 0, settleStart = 0, nameAlpha = 0;
  var measure = document.createElement('canvas').getContext('2d');
  function fontAt(s) { return 'italic 700 ' + s + 'px ' + NAME_FONT; }
  function fitLines() {
    return LINES.map(function (l, i) {
      measure.font = fontAt(100);
      var w = measure.measureText(l.t).width / 100;
      return { t: l.t, s: Math.min(l.s, (i ? 930 : 900) / w), y: l.y };
    });
  }
  function paintName(ctx, lines, mode) {
    ctx.save();
    ctx.translate(500, 180); ctx.rotate(-3 * Math.PI / 180); ctx.translate(-500, -180);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    lines.forEach(function (l, i) {
      ctx.font = fontAt(l.s);
      if (mode === 'mask') { ctx.fillStyle = ctx.strokeStyle = '#fff'; ctx.lineWidth = 14; ctx.strokeText(l.t, 500, l.y); ctx.fillText(l.t, 500, l.y); return; }
      if (mode === 'fill') { ctx.fillStyle = '#fff'; ctx.fillText(l.t, 500, l.y); return; }
      var g = ctx.createLinearGradient(0, l.y - l.s * 0.8, 0, l.y + l.s * 0.1);
      if (i) { g.addColorStop(0, '#FFFFFF'); g.addColorStop(0.5, '#FFD1EA'); g.addColorStop(1, '#F27BB5'); }
      else { g.addColorStop(0, '#FFFFFF'); g.addColorStop(0.55, '#FFE7A8'); g.addColorStop(1, '#F5B94E'); }
      ctx.save(); ctx.shadowColor = i ? 'rgba(255,120,200,.95)' : 'rgba(255,210,120,.95)'; ctx.shadowBlur = 34;
      ctx.fillStyle = g; ctx.fillText(l.t, 500, l.y); ctx.restore();
      ctx.strokeStyle = 'rgba(120,40,110,.45)'; ctx.lineWidth = 2.5; ctx.strokeText(l.t, 500, l.y);
      ctx.fillStyle = g; ctx.fillText(l.t, 500, l.y);
    });
    ctx.restore();
  }
  function layoutName() {
    var r = anchor.getBoundingClientRect(), k = r.width / 1000, pad = 70, lines = fitLines();
    var cw = Math.ceil((1000 + pad * 2) * k), ch = Math.ceil((360 + pad * 2) * k);
    function layer(mode, scale) {
      var c = document.createElement('canvas'); c.width = Math.ceil(cw * scale); c.height = Math.ceil(ch * scale);
      var x = c.getContext('2d'); x.setTransform(k * scale, 0, 0, k * scale, pad * k * scale, pad * k * scale); paintName(x, lines, mode);
      return c;
    }
    var art = layer('art', DPR), fill = layer('fill', DPR), mask = layer('mask', 1);
    var sheen = document.createElement('canvas'); sheen.width = art.width; sheen.height = art.height;
    var data = mask.getContext('2d').getImageData(0, 0, cw, ch).data;
    var left = r.left - pad * k, top = r.top - pad * k, step = clamp(lines[1].s * k * 0.058, 3.4, 9), pts = [];
    for (var pass = 0; pass < 4; pass++) {
      pts = [];
      for (var y = step / 2, row = 0; y < ch; y += step, row++) {
        for (var x = (row % 2 ? step / 2 : 0) + step / 4; x < cw; x += step) {
          if (data[((y | 0) * cw + (x | 0)) * 4 + 3] > 128) pts.push({ x: left + x + rand(-step * 0.2, step * 0.2), y: top + y + rand(-step * 0.2, step * 0.2) });
        }
      }
      if (pts.length <= 1500) break;
      step *= Math.sqrt(pts.length / 1450);
    }
    L = { ax: r.left, ay: r.top, left: left, top: top, ch: ch, art: art, fill: fill, sheen: sheen, pts: pts, step: step };
  }
  /* độ lệch của chữ so với lúc dựng (khi cảnh đã trôi ngang) */
  function nameOffset() { var r = anchor.getBoundingClientRect(); return { x: r.left - L.ax, y: r.top - L.ay }; }
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  function startFlight() {
    /* bay lên từ đồi cỏ và từ vòng nguyệt quế */
    var mr = $('.wreath').getBoundingClientRect(), minX = Infinity, maxX = -Infinity;
    L.pts.forEach(function (p) { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x; });
    var spanX = Math.max(1, maxX - minX), R = Math.min(W, H);
    minis = L.pts.map(function (p) {
      var fromMoon = Math.random() < 0.2;
      var sx = fromMoon ? mr.left + mr.width * rand(0.2, 0.8) : rand(0, W), sy = fromMoon ? mr.top + mr.height * rand(0.2, 0.8) : H * rand(0.72, 0.95);
      var a = rand(-Math.PI, 0), rr = rand(0.15, 0.45) * R, a2 = a + (Math.random() < 0.5 ? -1 : 1) * rand(1, 2);
      return { sx: sx, sy: sy, c1x: sx + Math.cos(a) * rr, c1y: sy + Math.sin(a) * rr, c2x: p.x + Math.cos(a2) * rr * 0.5, c2y: p.y + Math.sin(a2) * rr * 0.5,
        tx: p.x, ty: p.y, delay: 80 + (p.x - minX) / spanX * 900 + rand(0, 700), dur: rand(1400, 2200),
        spin: rand(-3, 3), rf: rand(-0.5, 0.5), fp: rand(0, 6.28), kind: Math.random() < 0.22 ? 'b' : 'f', gi: anyGlow(), bc: BCOLORS[(Math.random() * BCOLORS.length) | 0] };
    });
    /* mốc thời gian lấy theo khung hình đầu tiên để khớp đồng hồ của requestAnimationFrame */
    flyStart = 0;
    flyEnd = minis.reduce(function (m, q) { return Math.max(m, q.delay + q.dur); }, 0);
    state = 'flying';
  }
  function drawMinis(now, alpha) {
    var mw = Math.max(3, L.step * 0.95), o = nameOffset();
    for (var i = 0; i < minis.length; i++) {
      var m = minis[i], t = (now - flyStart - m.delay) / m.dur;
      if (t <= 0) continue;
      if (t > 1) t = 1;
      var e = easeOut(t), u = 1 - e;
      var x = u * u * u * m.sx + 3 * u * u * e * m.c1x + 3 * u * e * e * (m.c2x + o.x) + e * e * e * (m.tx + o.x);
      var y = u * u * u * m.sy + 3 * u * u * e * m.c1y + 3 * u * e * e * (m.c2y + o.y) + e * e * e * (m.ty + o.y);
      var sc = 1 + Math.sin(Math.PI * e) * 0.9, a0 = alpha * Math.min(1, t * 5);
      if (m.kind === 'f') {
        var tw = 0.7 + 0.3 * Math.sin(now / 110 + m.fp * 3), gr = mw * (t < 1 ? 2.4 : 1.8) * tw * sc * DPR;
        fctx.setTransform(1, 0, 0, 1, 0, 0);
        fctx.globalCompositeOperation = 'lighter'; fctx.globalAlpha = a0;
        fctx.drawImage(GLOWS[m.gi], DPR * x - gr, DPR * y - gr, gr * 2, gr * 2);
        fctx.globalCompositeOperation = 'source-over';
      } else {
        var rot = m.rf + u * m.spin + Math.sin(now / 300 + m.fp) * 0.25, fl = Math.abs(Math.sin(now / 55 + m.fp)) * (t < 1 ? 1 : 0.6) + 0.15;
        var c = Math.cos(rot), s = Math.sin(rot), kk = DPR * mw * 1.15 * sc;
        fctx.setTransform(c * kk, s * kk, -s * kk, c * kk, DPR * x, DPR * y);
        fctx.globalAlpha = a0; fctx.fillStyle = m.bc;
        for (var d = -1; d <= 1; d += 2) {
          fctx.beginPath(); fctx.ellipse(d * 0.6 * fl, -0.28, 0.6 * fl + 0.04, 0.44, d * -0.5, 0, 6.283); fctx.fill();
          fctx.beginPath(); fctx.ellipse(d * 0.42 * fl, 0.36, 0.38 * fl + 0.03, 0.3, d * 0.5, 0, 6.283); fctx.fill();
        }
        fctx.fillStyle = 'rgba(255,255,255,.55)';
        for (var d2 = -1; d2 <= 1; d2 += 2) { fctx.beginPath(); fctx.ellipse(d2 * 0.66 * fl, -0.38, 0.22 * fl + 0.02, 0.14, 0, 0, 6.283); fctx.fill(); }
        fctx.fillStyle = '#2B2540'; fctx.beginPath(); fctx.ellipse(0, 0.05, 0.08, 0.48, 0, 0, 6.283); fctx.fill();
      }
      if (t < 1 && Math.random() < 0.03) addPart(x, y, { sp: rand(0.1, 0.6), g: 0.01, max: rand(380, 700), r: rand(1.6, 3.6) });
    }
    fctx.setTransform(1, 0, 0, 1, 0, 0); fctx.globalAlpha = 1;
  }
  function drawName(now, alpha) {
    var o = nameOffset(), x = L.left + o.x, y = L.top + o.y;
    if (x > W || x + L.art.width / DPR < 0) return;
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.globalAlpha = alpha;
    fctx.drawImage(L.art, x * DPR, y * DPR);
    if (!reduce) {
      var sc = L.sheen.getContext('2d'), w = L.sheen.width, h = L.sheen.height;
      sc.globalCompositeOperation = 'source-over'; sc.clearRect(0, 0, w, h); sc.drawImage(L.fill, 0, 0);
      sc.globalCompositeOperation = 'source-in';
      var ph = (now % 5200) / 5200, bx = -0.3 * w + ph * 1.8 * w, bw = w * 0.12;
      var g = sc.createLinearGradient(bx - bw, 0, bx + bw, h * 0.6);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      sc.fillStyle = g; sc.fillRect(0, 0, w, h);
      fctx.globalAlpha = alpha * 0.6;
      fctx.drawImage(L.sheen, x * DPR, y * DPR);
      if (alpha >= 1 && L.pts.length && Math.random() < 0.3) {
        var p = L.pts[(Math.random() * L.pts.length) | 0];
        if (Math.random() < 0.5) addGlow(p.x + o.x + rand(-20, 20), p.y + o.y + rand(-20, 20), { sp: rand(0.1, 0.5), up: 0.15, r: rand(5, 11), max: rand(1400, 2600) });
        else addPart(p.x + o.x, p.y + o.y, { sp: rand(0, 0.3), g: 0, max: rand(500, 900), r: rand(2.5, 5) });
      }
    }
    fctx.globalAlpha = 1;
  }
  function revealName() {
    var ready = (document.fonts && document.fonts.load) ? Promise.race([document.fonts.load(fontAt(80), 'Trương Thị Thanh Huyền'), new Promise(function (r) { setTimeout(r, 1500); })]) : Promise.resolve();
    ready.catch(function () {}).then(function () {
      layoutName();
      if (reduce) { state = 'done'; nameAlpha = 1; return; }
      setTimeout(startFlight, 500);
    });
  }

  /* ---------- hành trình: cuộn dọc → cảnh trôi ngang ---------- */
  var progT = 0, prog = 0, trackX = 0, finaleDone = false, current = -1;
  function scrollSpan() { return Math.max(1, journey.offsetHeight - stage.offsetHeight); }
  function readScroll() { progT = clamp((window.scrollY - journey.offsetTop) / scrollSpan(), 0, 1); }
  function goTo(i) { window.scrollTo({ top: journey.offsetTop + i / (N - 1) * scrollSpan(), behavior: reduce ? 'auto' : 'smooth' }); }
  function updateJourney(dt) {
    prog += (progT - prog) * (reduce ? 1 : Math.min(1, dt / 1000 * 6));
    if (Math.abs(progT - prog) < 1e-5) prog = progT;
    var span = track.offsetWidth - W, gap = (progT - prog) * span;
    trackX = prog * span;
    track.style.transform = 'translate3d(' + (-trackX).toFixed(1) + 'px,0,0)';
    skyTrack.style.transform = 'translate3d(' + (-trackX * 0.3).toFixed(1) + 'px,0,0)';
    for (var i = 0; i < bgs.length; i++) bgs[i].style.backgroundPositionX = (-trackX * bgs[i]._speed).toFixed(1) + 'px';
    var moving = Math.abs(gap) > 1.5;
    companion.classList.toggle('walking', moving);
    if (moving) companion.classList.toggle('back', gap < 0);
    var idx = Math.round(prog * (N - 1));
    if (idx !== current) {
      current = idx;
      dots.forEach(function (d, k) { d.classList.toggle('on', k === idx); d.setAttribute('aria-current', k === idx ? 'step' : 'false'); });
    }
    hint.classList.toggle('gone', prog > 0.02);
    if (idx === N - 1 && !finaleDone) { finaleDone = true; fireworks(); }
  }
  dots.forEach(function (d) { d.addEventListener('click', function () { goTo(+d.dataset.i); }); });
  $('#toStart').addEventListener('click', function () { goTo(0); });
  /* bàn phím: Tab tới nội dung chặng nào thì cuộn tới chặng đó; mũi tên trái/phải để chuyển chặng */
  track.addEventListener('focusin', function (e) {
    var st = e.target.closest('.station');
    stage.scrollLeft = 0;
    if (st) goTo(+st.id.split('-')[1]);
  });
  stage.addEventListener('scroll', function () { stage.scrollLeft = 0; stage.scrollTop = 0; });
  window.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input,textarea')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(clamp(current + 1, 0, N - 1)); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(clamp(current - 1, 0, N - 1)); }
  });
  window.addEventListener('scroll', readScroll, { passive: true });

  function fireworks() {
    if (reduce) return;
    for (var b = 0; b < 6; b++) {
      (function (b) {
        setTimeout(function () {
          var x = W * rand(0.15, 0.85), y = H * rand(0.12, 0.4), gi = anyGlow();
          for (var i = 0; i < 26; i++) addGlow(x, y, { a: i / 26 * 6.283, sp: rand(1.5, 3.4), up: -0.02, r: rand(5, 10), max: rand(1200, 1900), img: gi });
          for (var j = 0; j < 14; j++) addPart(x, y, { a: rand(0, 6.283), sp: rand(1, 4), g: 0.03, max: rand(700, 1100), r: rand(2, 4) });
        }, b * 420);
      })(b);
    }
  }
  /* chạm để tung đom đóm */
  if (!reduce) window.addEventListener('pointerdown', function (e) {
    for (var i = 0; i < 8; i++) addGlow(e.clientX, e.clientY, { a: i / 8 * 6.283, sp: rand(0.8, 2), up: 0.1, r: rand(5, 10), max: rand(900, 1500) });
    for (var j = 0; j < 8; j++) addPart(e.clientX, e.clientY, { sp: rand(1, 3), g: 0.04, max: rand(500, 800), r: rand(2, 4) });
  }, { passive: true });

  /* ---------- đếm ngày, lưu vào lịch ---------- */
  function vnDay(t) { return new Date(t + 7 * 3600e3).toISOString().slice(0, 10); }
  function countdown() {
    var now = Date.now(), st;
    if (now < EVENT.start) {
      var days = Math.round((Date.parse(vnDay(EVENT.start)) - Date.parse(vnDay(now))) / 86400e3);
      st = days > 0 ? ['Còn', String(days), 'ngày nữa'] : ['', 'Hôm nay', 'hẹn bạn nhé!'];
    } else st = now < EVENT.end ? ['', '', 'Mình đang chờ bạn đó!'] : ['', '', 'Cảm ơn bạn đã đến!'];
    $('#cdPre').textContent = st[0]; $('#cdNum').textContent = st[1]; $('#cdPost').textContent = st[2];
  }
  countdown(); setInterval(countdown, 60000);
  $('#icsBtn').addEventListener('click', function () {
    var fmt = function (t) { return new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Thu moi Thanh Huyen//VI', 'BEGIN:VEVENT', 'UID:le-tot-nghiep-thanh-huyen-2026',
      'DTSTAMP:' + fmt(Date.now()), 'DTSTART:' + fmt(EVENT.start), 'DTEND:' + fmt(EVENT.end), 'SUMMARY:' + EVENT.title, 'LOCATION:' + EVENT.place,
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    a.download = 'le-tot-nghiep-thanh-huyen.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  /* ---------- vòng lặp ---------- */
  function resize() {
    var nw = window.innerWidth, nh = window.innerHeight, changed = Math.abs(nw - W) > 0 || Math.abs(nh - H) > 140;
    W = nw; H = nh; DPR = Math.min(2, window.devicePixelRatio || 1);
    [sky, fx].forEach(function (c) { c.width = Math.round(W * DPR); c.height = Math.round(H * DPR); });
    if (changed) {
      makeSky();
      if (L && state === 'done') layoutName();
    }
    readScroll();
  }
  var last = performance.now();
  function frame(now) {
    var dt = Math.min(50, now - last); last = now;
    updateJourney(dt);
    drawSky(now / 1000, dt);
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.clearRect(0, 0, fx.width, fx.height);
    if (L) {
      if (state === 'flying') {
        if (!flyStart) { flyStart = now; flyEnd += now; }
        drawMinis(now, 1);
        if (now >= flyEnd) { state = 'settle'; settleStart = now; }
      } else if (state === 'settle') {
        var p = clamp((now - settleStart) / 900, 0, 1);
        nameAlpha = p; drawMinis(now, 1 - p);
        if (p >= 1) { minis = []; state = 'done'; }
      }
      if (nameAlpha > 0) drawName(now, nameAlpha);
    }
    /* đom đóm bay lên từ đồi cỏ */
    if (!reduce && Math.random() < dt / 16.67 * 0.35) addGlow(rand(0, W), H * rand(0.7, 0.96), { sp: rand(0.1, 0.4), up: rand(0.2, 0.5), r: rand(4, 10), max: rand(2200, 4200) });
    drawGlows(dt);
    fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    stepParts(dt);
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    requestAnimationFrame(frame);
  }
  window.addEventListener('resize', resize);
  resize();
  revealName();
  requestAnimationFrame(frame);
})();
