/* ===== Thư mời của Thanh Huyền — rừng hoa màu nước lúc hoàng hôn: nụ hoa nở, bướm và đom đóm tụ thành tên, sao lấp lánh, thú nhỏ ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var PCOLORS = ['#FFF3C4', '#FBE3A0', '#FFFFFF', '#F7D6DF', '#E9F3D6'];
  var PETALS = ['#F7C6D3', '#F2A7BC', '#FFF4F0', '#FBD9C4', '#E9D8F0'];
  var BCOLORS = ['#FF8FC8', '#B79CFF', '#7FD8F2', '#FFC46B', '#8FE3B0', '#FFB0D8'];
  var TWINKLE = ['#FFFFFF', '#FFE58A', '#9FF0FF', '#FFB3E0', '#D4B8FF'];
  var NAME_FONT = '"Lora",Georgia,serif';
  var LINES = [{ t: 'Trương Thị', s: 124, y: 150 }, { t: 'Thanh Huyền', s: 150, y: 310 }];
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  var hero = $('#top'), garden = $('#garden'), bloomEl = $('#bloom'), tilt = $('#blTilt'), core = $('#core'),
      logoWrap = $('#logoWrap'), welcome = $('#welcome'), after = $('#after'), floatWrap = $('#floaters');

  /* ---------- bướm 2.5D: hai cánh SVG vỗ quanh thân bằng CSS 3D ---------- */
  var BFLY = '<span class="bf-fly"><span class="bf-tilt"><svg class="wing l" viewBox="0 0 50 100"><use href="#bWing"/></svg>' +
    '<svg class="wing r" viewBox="0 0 50 100"><use href="#bWing" transform="matrix(-1 0 0 1 50 0)"/></svg>' +
    '<svg class="bf-body" viewBox="0 0 20 100"><use href="#bBody"/></svg></span></span>';
  $$('.critter[data-kind]').forEach(function (c) {
    c.innerHTML = (window.CritterArt || {})[c.dataset.kind] || '';
    $$('.cr-eye', c).forEach(function (e) { e.style.animationDelay = (-rand(0, 4)).toFixed(2) + 's'; });
  });
  $$('.bfly').forEach(function (b) { if (!b.firstChild) b.innerHTML = BFLY; b.style.setProperty('--fl', rand(0.26, 0.42).toFixed(2) + 's'); });

  /* ---------- nụ hoa: 10 cánh ngoài, 8 cánh trong ---------- */
  var petalHTML = '';
  for (var pi = 0; pi < 10; pi++) petalHTML += '<span class="bl-petal" style="--a:' + (pi * 36) + 'deg;--i:' + pi + '"><svg viewBox="0 0 100 160"><use href="#petal"/></svg></span>';
  for (var pj = 0; pj < 8; pj++) petalHTML += '<span class="bl-petal inner" style="--a:' + (pj * 45 + 22.5) + 'deg;--i:' + (pj + 6) + '"><svg viewBox="0 0 100 160"><use href="#petalIn"/></svg></span>';
  tilt.innerHTML = petalHTML;
  var petalEls = $$('.bl-petal', tilt);

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

  /* ---------- canvas ---------- */
  var sky = $('#sky'), sctx = sky.getContext('2d'), fx = $('#fx'), fctx = fx.getContext('2d');
  var W = 0, H = 0, DPR = 1, pollen = [], petals = [], twinkles = [], skyParts = [], fxParts = [];
  var smooth = window.scrollY, prevSmooth = smooth, vel = 0;

  function sparkPath(ctx, x, y, r) {
    var k = r * 0.2;
    ctx.beginPath(); ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x + k, y - k, x + r, y); ctx.quadraticCurveTo(x + k, y + k, x, y + r);
    ctx.quadraticCurveTo(x - k, y + k, x - r, y); ctx.quadraticCurveTo(x - k, y - k, x, y - r); ctx.closePath();
  }
  /* cánh hoa: elip nhọn một đầu, lật theo trục (flip -1..1) cho cảm giác 2.5D */
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
  function makeSky() {
    pollen = [];
    var count = clamp(Math.round(W * H / 14000), 30, 120);
    for (var i = 0; i < count; i++) {
      var big = Math.random() < 0.15;
      pollen.push({ x: Math.random() * W, y: Math.random() * H, r: big ? rand(3, 5.5) : rand(1, 2.4), big: big,
        ph: Math.random() * 6.28, sp: rand(0.6, 2), d: rand(0.03, 0.14), c: TWINKLE[(Math.random() * TWINKLE.length) | 0] });
    }
    twinkles = [];
    var tc = clamp(Math.round(W * H / 24000), 18, 80);
    for (var k = 0; k < tc; k++) {
      var ci = (Math.random() * TWINKLE.length) | 0;
      twinkles.push({ x: Math.random() * W, y: Math.random() * H, r: rand(3, 9), ph: Math.random() * 6.28, sp: rand(1.2, 3.4), d: rand(0.02, 0.1), c: TWINKLE[ci], g: GLOWS[ci % GLOWS.length] });
    }
    petals = [];
    var pc = clamp(Math.round(W * H / 38000), 10, 40);
    for (var j = 0; j < pc; j++) {
      petals.push({ x: Math.random() * W, y: Math.random() * H, r: rand(5, 11), vy: rand(0.35, 0.9), sw: rand(0.4, 1.2), ph: Math.random() * 6.28,
        rot: Math.random() * 6.28, vr: rand(-0.02, 0.02), fl: rand(1.2, 2.6), d: rand(0.05, 0.25), c: PETALS[j % PETALS.length] });
    }
  }
  function addPart(list, x, y, opt) {
    if (list.length > 700) list.shift();
    opt = opt || {};
    var a = opt.a != null ? opt.a : Math.random() * 6.28, sp = opt.sp != null ? opt.sp : rand(0.2, 1.4);
    list.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (opt.up || 0), g: opt.g != null ? opt.g : 0.02,
      life: 0, max: opt.max || rand(500, 1000), r: opt.r || rand(2, 5), c: opt.c || (opt.pt ? PETALS : PCOLORS)[(Math.random() * 5) | 0],
      pt: !!opt.pt, rot: Math.random() * 6.28, vr: rand(-0.006, 0.006) });
  }
  function stepParts(ctx, list, dt, offY) {
    for (var i = list.length - 1; i >= 0; i--) {
      var p = list[i];
      p.life += dt;
      if (p.life >= p.max) { list.splice(i, 1); continue; }
      var f = dt / 16.67;
      p.x += p.vx * f; p.y += p.vy * f; p.vy += p.g * f; p.vx *= 0.985;
      var t = p.life / p.max, s = p.r * (t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8 * 0.9);
      var y = p.y - offY;
      if (y < -20 || y > H + 20) continue;
      ctx.globalAlpha = 1 - t * t;
      ctx.fillStyle = p.c;
      if (p.pt) {
        petalPath(ctx, p.x, y, Math.max(0.6, s * 1.4), p.rot + p.life * p.vr, Math.cos(p.life / 180));
        ctx.fill();
      } else { sparkPath(ctx, p.x, y, Math.max(0.3, s)); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
  }

  /* hạt sáng (bokeh) */
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
  var glowImg = GLOWS[0];
  function anyGlow() { return (Math.random() * GLOWS.length) | 0; }
  var glows = [];
  function addGlow(x, y, opt) {
    if (reduce || glows.length > 380) return;
    opt = opt || {};
    var a = opt.a != null ? opt.a : rand(0, 6.283), sp = opt.sp != null ? opt.sp : rand(0.05, 0.4);
    glows.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (opt.up != null ? opt.up : 0.35), life: -(opt.delay || 0),
      max: opt.max || rand(1800, 3600), r: opt.r || rand(6, 16), img: GLOWS[opt.img != null ? opt.img : anyGlow()] });
  }
  function drawGlows(dt) {
    var sy0 = window.scrollY;
    fctx.globalCompositeOperation = 'lighter';
    for (var i = glows.length - 1; i >= 0; i--) {
      var p = glows[i];
      p.life += dt;
      if (p.life < 0) continue;
      if (p.life >= p.max) { glows.splice(i, 1); continue; }
      var f = dt / 16.67; p.x += p.vx * f; p.y += p.vy * f; p.vx *= 0.995;
      var t = p.life / p.max, y = p.y - sy0;
      if (y < -40 || y > H + 40) continue;
      fctx.globalAlpha = Math.sin(Math.PI * t) * 0.9;
      var r = p.r * (0.7 + 0.3 * Math.sin(p.life / 300));
      fctx.drawImage(p.img, (p.x - r) * DPR, (y - r) * DPR, r * 2 * DPR, r * 2 * DPR);
    }
    fctx.globalAlpha = 1; fctx.globalCompositeOperation = 'source-over';
  }

  function resize() {
    var nw = window.innerWidth, nh = window.innerHeight, widthChanged = nw !== W, bigH = Math.abs(nh - H) > 140;
    W = nw; H = nh; DPR = Math.min(2, window.devicePixelRatio || 1);
    [sky, fx].forEach(function (c) { c.width = Math.round(W * DPR); c.height = Math.round(H * DPR); });
    if (widthChanged || bigH || !pollen.length) makeSky();
    if (widthChanged) {
      buildFloaters();
      if (state === 'done' || state === 'flying' || state === 'settle') { layoutName(); finishFlight(); }
    }
  }

  function drawSky(t, dt) {
    sctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    sctx.clearRect(0, 0, W, H);
    /* phấn hoa lơ lửng */
    for (var i = 0; i < pollen.length; i++) {
      var s = pollen[i], y = ((s.y - smooth * s.d) % H + H) % H;
      var a = reduce ? 0.8 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
      var sx = reduce ? s.x : s.x + Math.sin(t * s.sp * 0.5 + s.ph) * 8;
      sctx.globalAlpha = a; sctx.fillStyle = s.c;
      if (s.big) { var gr = s.r * 3.2 * (0.7 + 0.3 * a); sctx.drawImage(GLOWS[i % GLOWS.length], sx - gr, y - gr, gr * 2, gr * 2); }
      else { sctx.beginPath(); sctx.arc(sx, y, s.r, 0, 6.283); sctx.fill(); }
    }
    /* sao bốn cánh chớp sáng */
    sctx.globalCompositeOperation = 'lighter';
    for (var w = 0; w < twinkles.length; w++) {
      var tw = twinkles[w], ty = ((tw.y - smooth * tw.d) % H + H) % H;
      var ta = reduce ? 0.6 : Math.pow(Math.max(0, Math.sin(t * tw.sp + tw.ph)), 6);
      if (ta < 0.03) continue;
      var tr = tw.r * (0.5 + ta);
      sctx.globalAlpha = ta * 0.8; sctx.drawImage(tw.g, tw.x - tr * 2.4, ty - tr * 2.4, tr * 4.8, tr * 4.8);
      sctx.globalAlpha = ta; sctx.fillStyle = tw.c; sparkPath(sctx, tw.x, ty, tr); sctx.fill();
    }
    sctx.globalCompositeOperation = 'source-over';
    /* cánh hoa rơi chậm, vừa xoay vừa lật */
    var f0 = dt / 16.67;
    for (var k = 0; k < petals.length; k++) {
      var q = petals[k];
      if (!reduce) { q.y += q.vy * f0; q.x += Math.sin(t * q.sw + q.ph) * 0.6 * f0 + 0.15 * f0; q.rot += q.vr * f0; }
      if (q.y > H + 20) { q.y = -20; q.x = Math.random() * W; }
      if (q.x > W + 20) q.x = -20;
      var py = ((q.y - smooth * q.d) % (H + 40) + H + 40) % (H + 40) - 20;
      sctx.globalAlpha = 0.8; sctx.fillStyle = q.c;
      petalPath(sctx, q.x, py, q.r, q.rot, reduce ? 1 : Math.cos(t * q.fl + q.ph));
      sctx.fill();
    }
    sctx.globalAlpha = 1;
    stepParts(sctx, skyParts, dt, 0);
  }

  /* ---------- bướm bay theo cuộn ---------- */
  var floaters = [];
  function buildFloaters() {
    var count = W < 640 ? 4 : W < 1024 ? 6 : 8;
    if (floaters.length !== count) {
      floatWrap.textContent = ''; floaters = [];
      for (var i = 0; i < count; i++) {
        var el = document.createElement('div');
        el.className = 'floater bfly';
        el.style.setProperty('--bc', BCOLORS[i % BCOLORS.length]);
        el.style.setProperty('--fl', rand(0.24, 0.4).toFixed(2) + 's');
        el.style.aspectRatio = '1';
        el.innerHTML = BFLY;
        floatWrap.appendChild(el);
        floaters.push({ el: el, side: i % 2 ? 1 : -1, y0: (i + 0.5) / count + rand(-0.05, 0.05),
          speed: rand(0.12, 0.42), ph: Math.random() * 6.28, fs: rand(0.5, 1), r0: rand(-22, 22), lag: 0, k: rand(5, 11), sc: rand(0.82, 1.12) });
      }
    }
    var lane = Math.max(0, (W - 1120) / 2);
    floaters.forEach(function (f) {
      f.w = f.el.offsetWidth || 56; f.h = f.el.offsetHeight || 56;
      var x = lane > f.w + 24 ? rand(10, lane - f.w - 10) : -f.w * rand(0.1, 0.3);
      f.x0 = f.side < 0 ? x : W - f.w - x;
    });
  }
  function updateFloaters(t) {
    var appear = reduce ? 0 : clamp((window.scrollY - H * 0.3) / (H * 0.5), 0, 1);
    floatWrap.style.opacity = (appear * (W < 640 ? 0.7 : 0.95)).toFixed(3);
    if (appear <= 0) return;
    var v = clamp(vel, -60, 60);
    for (var i = 0; i < floaters.length; i++) {
      var f = floaters[i], span = H + f.h * 2 + 40;
      f.lag += (v * f.k - f.lag) * 0.06;
      var y = ((f.y0 * span - smooth * f.speed) % span + span) % span - f.h - 20 + clamp(f.lag, -140, 140);
      var x = f.x0 + Math.sin(t * f.fs + f.ph) * (14 + Math.min(36, Math.abs(v) * 1.6)) * f.side;
      var rot = f.r0 + Math.sin(t * f.fs * 0.8 + f.ph) * 10 + clamp(v * 1.3, -32, 32) * f.side;
      f.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + rot.toFixed(1) + 'deg) scale(' + f.sc + ')';
      if (Math.abs(v) > 2.5 && Math.random() < Math.min(0.9, Math.abs(v) * 0.04)) {
        addPart(skyParts, x + f.w / 2 + rand(-f.w * 0.3, f.w * 0.3), y + f.h / 2 + rand(-f.h * 0.3, f.h * 0.3),
          { sp: rand(0.2, 0.8), a: v > 0 ? -Math.PI / 2 + rand(-0.6, 0.6) : Math.PI / 2 + rand(-0.6, 0.6), g: 0, max: rand(450, 850), r: rand(2, 4.5), c: Math.random() < 0.5 ? '#FFF1BE' : '#FFFFFF' });
      }
    }
  }

  /* ---------- tên được xếp từ cánh hoa ---------- */
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
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round'; ctx.miterLimit = 2;
    lines.forEach(function (l) {
      ctx.font = fontAt(l.s);
      if (mode === 'mask') {
        ctx.fillStyle = ctx.strokeStyle = '#fff'; ctx.lineWidth = 14;
        ctx.strokeText(l.t, 500, l.y); ctx.fillText(l.t, 500, l.y);
      } else if (mode === 'fill') {
        ctx.fillStyle = '#fff'; ctx.fillText(l.t, 500, l.y);
      } else {
        ctx.save(); ctx.shadowColor = 'rgba(40,60,45,.35)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8;
        ctx.fillStyle = 'rgba(60,80,60,.25)'; ctx.fillText(l.t, 500, l.y + 4); ctx.restore();
      }
    });
    if (mode === 'art') {
      lines.forEach(function (l, i) {
        ctx.font = fontAt(l.s);
        var g = ctx.createLinearGradient(0, l.y - l.s * 0.8, 0, l.y + l.s * 0.1);
        if (i) { g.addColorStop(0, '#FFFFFF'); g.addColorStop(0.5, '#FFD1EA'); g.addColorStop(1, '#F27BB5'); }
        else { g.addColorStop(0, '#FFFFFF'); g.addColorStop(0.55, '#FFE7A8'); g.addColorStop(1, '#F5B94E'); }
        ctx.save(); ctx.shadowColor = i ? 'rgba(255,120,200,.95)' : 'rgba(255,210,120,.95)'; ctx.shadowBlur = 34;
        ctx.fillStyle = g; ctx.fillText(l.t, 500, l.y); ctx.restore();
        ctx.strokeStyle = 'rgba(120,40,110,.45)'; ctx.lineWidth = 2.5; ctx.strokeText(l.t, 500, l.y);
        ctx.fillStyle = g; ctx.fillText(l.t, 500, l.y);
      });
    }
    ctx.restore();
  }
  function layoutName() {
    var r = logoWrap.getBoundingClientRect(), k = r.width / 1000, pad = 70;
    var lines = fitLines();
    var cw = Math.ceil((1000 + pad * 2) * k), ch = Math.ceil((360 + pad * 2) * k);
    var art = document.createElement('canvas'); art.width = Math.ceil(cw * DPR); art.height = Math.ceil(ch * DPR);
    var actx = art.getContext('2d'); actx.setTransform(k * DPR, 0, 0, k * DPR, pad * k * DPR, pad * k * DPR);
    paintName(actx, lines, 'art');
    var fill = document.createElement('canvas'); fill.width = art.width; fill.height = art.height;
    var flctx = fill.getContext('2d'); flctx.setTransform(k * DPR, 0, 0, k * DPR, pad * k * DPR, pad * k * DPR);
    paintName(flctx, lines, 'fill');
    var sheen = document.createElement('canvas'); sheen.width = art.width; sheen.height = art.height;
    var mask = document.createElement('canvas'); mask.width = cw; mask.height = ch;
    var mctx = mask.getContext('2d'); mctx.setTransform(k, 0, 0, k, pad * k, pad * k);
    paintName(mctx, lines, 'mask');
    var data = mctx.getImageData(0, 0, cw, ch).data;
    var left = r.left - pad * k, top = r.top + window.scrollY - pad * k;
    var step = clamp(lines[1].s * k * 0.058, 3.4, 9), pts = [];
    for (var pass = 0; pass < 4; pass++) {
      pts = [];
      for (var y = step / 2, row = 0; y < ch; y += step, row++) {
        for (var x = (row % 2 ? step / 2 : 0) + step / 4; x < cw; x += step) {
          if (data[((y | 0) * cw + (x | 0)) * 4 + 3] > 128) pts.push({ x: left + x + rand(-step * 0.2, step * 0.2), y: top + y + rand(-step * 0.2, step * 0.2) });
        }
      }
      if (pts.length <= 1700) break;
      step *= Math.sqrt(pts.length / 1650);
    }
    L = { left: left, top: top, cw: cw, ch: ch, art: art, fill: fill, sheen: sheen, pts: pts, step: step };
  }
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  function startFlight(origins, now) {
    var minX = Infinity, maxX = -Infinity;
    L.pts.forEach(function (p) { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x; });
    var spanX = Math.max(1, maxX - minX), R = Math.min(W, H);
    minis = L.pts.map(function (p) {
      var o = origins[(Math.random() * origins.length) | 0];
      var sx = o.x + rand(-o.w * 0.35, o.w * 0.35), sy = o.y + rand(-o.h * 0.35, o.h * 0.35);
      var a = rand(-Math.PI, 0), rr = rand(0.18, 0.5) * R, a2 = a + (Math.random() < 0.5 ? -1 : 1) * rand(1, 2);
      return { sx: sx, sy: sy, c1x: sx + Math.cos(a) * rr, c1y: sy + Math.sin(a) * rr, c2x: p.x + Math.cos(a2) * rr * 0.5, c2y: p.y + Math.sin(a2) * rr * 0.5,
        tx: p.x, ty: p.y, delay: 80 + (p.x - minX) / spanX * 700 + rand(0, 380), dur: rand(950, 1500),
        spin: rand(-3, 3), rf: rand(-0.5, 0.5), fp: rand(0, 6.28), kind: Math.random() < 0.2 ? 'b' : 'f', gi: anyGlow(), bc: BCOLORS[(Math.random() * BCOLORS.length) | 0], landed: false };
    });
    flyStart = now;
    flyEnd = now + minis.reduce(function (m, q) { return Math.max(m, q.delay + q.dur); }, 0);
    state = 'flying';
  }
  function finishFlight() { minis = []; state = 'done'; nameAlpha = 1; revealAfter(); }
  function revealAfter() {
    if (!after.hidden) return;
    welcome.hidden = true; after.hidden = false;
  }
  function drawMinis(now, alpha) {
    var mw = Math.max(3, L.step * 0.95), mh = mw * 1.5, sy0 = window.scrollY;
    for (var i = 0; i < minis.length; i++) {
      var m = minis[i], t = (now - flyStart - m.delay) / m.dur;
      if (t <= 0) continue;
      if (t > 1) t = 1;
      var e = easeOut(t), u = 1 - e;
      var x = u * u * u * m.sx + 3 * u * u * e * m.c1x + 3 * u * e * e * m.c2x + e * e * e * m.tx;
      var y = u * u * u * m.sy + 3 * u * u * e * m.c1y + 3 * u * e * e * m.c2y + e * e * e * m.ty;
      var sc = 1 + Math.sin(Math.PI * e) * 0.9, a0 = alpha * Math.min(1, t * 5);
      if (m.kind === 'f') {
        /* đom đóm: chấm sáng nhấp nháy */
        var tw = 0.7 + 0.3 * Math.sin(now / 110 + m.fp * 3), gr = mw * (t < 1 ? 2.4 : 1.8) * tw * sc * DPR;
        fctx.setTransform(1, 0, 0, 1, 0, 0);
        fctx.globalCompositeOperation = 'lighter'; fctx.globalAlpha = a0;
        fctx.drawImage(GLOWS[m.gi], DPR * x - gr, DPR * (y - sy0) - gr, gr * 2, gr * 2);
        fctx.globalCompositeOperation = 'source-over';
      } else {
        /* bướm: cánh vỗ theo nhịp, nghiêng theo đường bay */
        var rot = m.rf + u * m.spin + Math.sin(now / 300 + m.fp) * 0.25, fl = Math.abs(Math.sin(now / 55 + m.fp)) * (t < 1 ? 1 : 0.6) + 0.15;
        var c = Math.cos(rot), s = Math.sin(rot), kk = DPR * mw * 1.15 * sc;
        fctx.setTransform(c * kk, s * kk, -s * kk, c * kk, DPR * x, DPR * (y - sy0));
        fctx.globalAlpha = a0; fctx.fillStyle = m.bc;
        for (var d = -1; d <= 1; d += 2) {
          fctx.beginPath(); fctx.ellipse(d * 0.6 * fl, -0.28, 0.6 * fl + 0.04, 0.44, d * -0.5, 0, 6.283); fctx.fill();
          fctx.beginPath(); fctx.ellipse(d * 0.42 * fl, 0.36, 0.38 * fl + 0.03, 0.3, d * 0.5, 0, 6.283); fctx.fill();
        }
        fctx.fillStyle = 'rgba(255,255,255,.55)';
        for (var d2 = -1; d2 <= 1; d2 += 2) { fctx.beginPath(); fctx.ellipse(d2 * 0.66 * fl, -0.38, 0.22 * fl + 0.02, 0.14, 0, 0, 6.283); fctx.fill(); }
        fctx.fillStyle = '#2B2540'; fctx.beginPath(); fctx.ellipse(0, 0.05, 0.08, 0.48, 0, 0, 6.283); fctx.fill();
      }
      if (t < 1 && Math.random() < 0.04) addPart(fxParts, x, y, { sp: rand(0.1, 0.6), g: 0.01, max: rand(380, 700), r: rand(1.6, 3.6), c: TWINKLE[(Math.random() * 5) | 0] });
      if (t === 1 && !m.landed) { m.landed = true; if (Math.random() < 0.12) addPart(fxParts, x, y, { sp: 0.3, g: 0, max: 420, r: rand(3, 5), c: '#FFFFFF' }); }
    }
    fctx.setTransform(1, 0, 0, 1, 0, 0); fctx.globalAlpha = 1;
  }
  function drawName(now, alpha) {
    var y = L.top - window.scrollY;
    if (y > H || y + L.ch < 0) return;
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.globalAlpha = alpha;
    fctx.drawImage(L.art, L.left * DPR, y * DPR);
    if (!reduce) {
      var sc = L.sheen.getContext('2d'), w = L.sheen.width, h = L.sheen.height;
      sc.globalCompositeOperation = 'source-over'; sc.clearRect(0, 0, w, h); sc.drawImage(L.fill, 0, 0);
      sc.globalCompositeOperation = 'source-in';
      var ph = (now % 4200) / 4200, bx = -0.3 * w + ph * 1.8 * w, bw = w * 0.12;
      var g = sc.createLinearGradient(bx - bw, 0, bx + bw, h * 0.6);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      sc.fillStyle = g; sc.fillRect(0, 0, w, h);
      fctx.globalAlpha = alpha * 0.75;
      fctx.drawImage(L.sheen, L.left * DPR, y * DPR);
      if (alpha >= 1 && Math.random() < 0.25 && L.pts.length) {
        var p = L.pts[(Math.random() * L.pts.length) | 0];
        addPart(fxParts, p.x, p.y, { sp: rand(0, 0.3), g: 0, max: rand(500, 900), r: rand(2.5, 5.5), c: TWINKLE[(Math.random() * TWINKLE.length) | 0] });
        if (Math.random() < 0.5) addGlow(p.x + rand(-20, 20), p.y + rand(-20, 20), { sp: rand(0.1, 0.5), up: 0.15, r: rand(5, 11), max: rand(1400, 2600) });
      }
    }
    fctx.globalAlpha = 1;
  }

  /* ---------- nụ hoa nở: cánh xòe 3D, nhụy hiện ảnh, cánh hoa bay lên xếp tên ---------- */
  var runId = 0;
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function bloomCenter() {
    var r = bloomEl.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY, w: r.width };
  }
  function petalOrigins() {
    return petalEls.map(function (p) {
      var r = p.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY, w: r.width, h: r.height };
    });
  }
  function openBloom() {
    if (state !== 'idle') return;
    state = 'blooming';
    var id = ++runId;
    hero.classList.add('opened');
    bloomEl.classList.add('open');
    core.setAttribute('aria-hidden', 'false');
    $('#heroTitle').textContent = 'Trương Thị Thanh Huyền — Thư mời tốt nghiệp';
    var ready = (document.fonts && document.fonts.load) ? Promise.race([document.fonts.load(fontAt(80), 'Trương Thị Thanh Huyền'), sleep(1200)]) : Promise.resolve();
    var c = bloomCenter();
    for (var gi = 0; gi < 36; gi++) addGlow(c.x + rand(-c.w * 0.4, c.w * 0.4), c.y + rand(-c.w * 0.4, c.w * 0.4), { sp: rand(0.3, 1.6), up: 0.5, r: rand(8, 20), max: rand(1200, 2400), delay: rand(0, 500) });
    sleep(reduce ? 0 : 700).then(function () {
      if (id !== runId) return;
      if (!reduce) for (var i = 0; i < 40; i++) addPart(fxParts, c.x, c.y, { a: i / 40 * 6.283 + rand(-0.15, 0.15), sp: rand(3, 8), g: 0.04, max: rand(900, 1500), r: rand(4, 8), pt: i % 2 === 0 });
      return sleep(reduce ? 0 : 900);
    }).then(function () {
      if (id !== runId) return;
      var origins = petalOrigins();
      return ready.catch(function () {}).then(function () {
        if (id !== runId) return;
        layoutName();
        if (reduce) { finishFlight(); return; }
        startFlight(origins, performance.now() + 60);
      });
    });
  }
  function closeBloom() {
    runId++;
    state = 'idle'; minis = []; nameAlpha = 0; L = null;
    hero.classList.remove('opened'); bloomEl.classList.remove('open');
    core.setAttribute('aria-hidden', 'true');
    after.hidden = true; welcome.hidden = false;
    $('#heroTitle').textContent = 'Thư mời tốt nghiệp của Trương Thị Thanh Huyền';
    $('#bloomBtn').focus({ preventScroll: true });
  }
  $('#bloomBtn').addEventListener('click', openBloom);
  $('#reshuffle').addEventListener('click', closeBloom);

  function drawFx(now, dt) {
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.clearRect(0, 0, fx.width, fx.height);
    if (L) {
      if (state === 'flying') {
        drawMinis(now, 1);
        if (now >= flyEnd) { state = 'settle'; settleStart = now; }
      } else if (state === 'settle') {
        var p = clamp((now - settleStart) / 800, 0, 1);
        nameAlpha = p;
        drawMinis(now, 1 - p);
        if (p >= 1) { minis = []; state = 'done'; revealAfter(); }
      }
      if (nameAlpha > 0) drawName(now, nameAlpha);
    }
    drawGlows(dt);
    fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    stepParts(fctx, fxParts, dt, window.scrollY);
    fctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  /* hạt sáng bay quanh nụ hoa khi trang chủ đang hiện */
  function ambientGlows(dt) {
    if (reduce || window.scrollY > hero.offsetHeight) return;
    if (Math.random() < dt / 16.67 * 0.3) addGlow(rand(0, W), hero.offsetHeight - rand(10, H * 0.38), { sp: rand(0.1, 0.4), up: rand(0.2, 0.5), r: rand(4, 10), max: rand(2200, 4200) });
    if (Math.random() < dt / 16.67 * 0.12) {
      var r = garden.getBoundingClientRect();
      addGlow(r.left + rand(0.05, 0.95) * r.width, r.top + window.scrollY + rand(0.05, 0.8) * r.height, { sp: rand(0.05, 0.25), up: rand(0.15, 0.45) });
    }
  }

  /* ---------- con trỏ rắc cánh hoa, bấm tung hoa ---------- */
  if (!reduce) {
    var lastX = 0, lastY = 0, acc = 0;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      acc += Math.hypot(e.clientX - lastX, e.clientY - lastY); lastX = e.clientX; lastY = e.clientY;
      if (acc > 18) { acc = 0; addPart(fxParts, e.clientX, e.clientY + window.scrollY, { sp: rand(0.2, 0.9), g: 0.03, max: rand(600, 1000), r: rand(3, 5.5), pt: Math.random() < 0.6 }); }
    }, { passive: true });
    window.addEventListener('pointerdown', function (e) {
      for (var i = 0; i < 12; i++) addPart(fxParts, e.clientX, e.clientY + window.scrollY, { a: i / 12 * 6.283 + rand(-0.2, 0.2), sp: rand(2, 4), g: 0.05, max: rand(600, 1000), r: rand(3, 6), pt: i % 2 === 0 });
    }, { passive: true });
  }

  /* ---------- đếm ngược tới ngày lễ (giờ Việt Nam) — sửa EV_START, EV_END cho đúng ---------- */
  var EV_START = Date.UTC(2026, 10, 7, 5, 30, 0), EV_END = Date.UTC(2026, 10, 7, 10, 0, 0); // 12h30 đến 17h00 giờ Việt Nam
  function vnDay(t) { return new Date(t + 7 * 3600e3).toISOString().slice(0, 10); }
  function eventState() {
    var now = Date.now();
    if (now < EV_START) {
      var days = Math.round((Date.parse(vnDay(EV_START)) - Date.parse(vnDay(now))) / 86400e3);
      return days > 0 ? { pre: 'Hoa nở sau', num: String(days), post: 'ngày' } : { pre: '', num: 'Hôm nay', post: 'lúc 12h30!' };
    }
    if (now < EV_END) return { pre: '', num: '', post: 'Mình đang chờ bạn ở khu vườn!' };
    return { pre: '', num: '', post: 'Cảm ơn bạn đã đến chung vui!' };
  }
  function countdown() {
    var st = eventState();
    $('#cdPre').textContent = st.pre; $('#cdNum').textContent = st.num; $('#cdPost').textContent = st.post;
  }
  countdown(); setInterval(countdown, 60000);

  /* ---------- cổng hoa tung cánh khi cuộn tới ---------- */
  var arch = $('#arch');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var r = arch.getBoundingClientRect();
        for (var i = 0; i < 26; i++) addPart(fxParts, r.left + r.width * rand(0.2, 0.8), r.top + rand(0, 60) + window.scrollY, { sp: rand(1.5, 4), up: 1, g: 0.05, max: rand(900, 1500), r: rand(3.5, 6.5), pt: true });
        io.disconnect();
      });
    }, { threshold: 0.35 });
    io.observe(arch);
  }

  /* ---------- chiều sâu theo chuột ---------- */
  var scene = $('#scene'), pmx = 0, pmy = 0, pmChanged = false;
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', function (e) { pmx = (e.clientX / W - 0.5) * 2; pmy = (e.clientY / H - 0.5) * 2; pmChanged = true; }, { passive: true });
  }

  /* ---------- vòng lặp ---------- */
  var last = performance.now();
  function frame(now) {
    var dt = Math.min(50, now - last); last = now;
    var t = now / 1000;
    smooth += (window.scrollY - smooth) * Math.min(1, dt / 1000 * 7.5);
    vel = (smooth - prevSmooth) * (16.67 / Math.max(1, dt)); prevSmooth = smooth;
    drawSky(t, dt);
    updateFloaters(t);
    ambientGlows(dt);
    if (pmChanged && window.scrollY < hero.offsetHeight) {
      pmChanged = false;
      scene.style.setProperty('--mx', (-pmx).toFixed(3)); scene.style.setProperty('--my', (-pmy).toFixed(3));
      garden.style.transform = 'translate(' + (pmx * 6).toFixed(1) + 'px,' + (pmy * 4).toFixed(1) + 'px)';
    }
    drawFx(now, dt);
    requestAnimationFrame(frame);
  }
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
