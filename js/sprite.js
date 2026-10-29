/* ===== Bộ hình SVG kiểu tranh màu nước cho hành trình dạo vườn ngang:
   cảnh nền dạng ô lặp liền mạch (núi, rừng, đồi cỏ, cỏ tiền cảnh), vòng nguyệt quế, cây ước nguyện, khinh khí cầu, hồ, lá sen, bướm, các con vật ===== */
(function () {
  'use strict';
  function n(v) { return Math.round(v * 10) / 10; }
  function deg(a) { return n(a * 180 / Math.PI); }
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  /* ---------- gradient dùng chung ---------- */
  function stops(list) { return list.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : '') + '/>'; }).join(''); }
  /* ngang (trái → phải) hoặc dọc (dưới → trên) */
  function lin(id, list, vertical) { return '<linearGradient id="' + id + '" x1="0" y1="' + (vertical ? 1 : 0) + '" x2="' + (vertical ? 0 : 1) + '" y2="0">' + stops(list) + '</linearGradient>'; }
  function rad(id, list, cx, cy) { return '<radialGradient id="' + id + '" cx="' + (cx || 0.5) + '" cy="' + (cy || 0.5) + '" r=".5">' + stops(list) + '</radialGradient>'; }
  var GRADS =
    lin('gLeaf', [[0, '#3B7A38'], [0.6, '#68AC4C'], [1, '#C2E596']]) +
    lin('gLeafD', [[0, '#2C5E2E'], [0.7, '#4A8A42'], [1, '#78B460']]) +
    lin('gLeafL', [[0, '#7CBA5C'], [1, '#E2F5C0']]) +
    lin('gFg', [[0, '#3E8236'], [0.6, '#6DB04A'], [1, '#B4DE7E']]) +
    lin('gPetalH', [[0, '#F0508F'], [1, '#FFE0EE']]) +
    lin('gPetalW', [[0, '#E9D3E6'], [1, '#FFFFFF']]) +
    lin('gPetalL', [[0, '#8A5CE0'], [1, '#F0E2FF']]) +
    lin('gPetalG', [[0, '#F0A630'], [1, '#FFF3C4']]) +
    lin('gPetalC', [[0, '#26AFCF'], [1, '#D9FAFF']]) +
    lin('gWood', [[0, '#3E2820'], [0.5, '#7A543A'], [1, '#4A3024']]) +
    lin('gWoodV', [[0, '#3E2820'], [1, '#8C6244']], true) +
    lin('gGround', [[0, '#5C9446'], [0.6, '#86BC62'], [1, '#B2D888']], true) +
    lin('gPad', [[0, '#3F7E3C'], [1, '#9CD474']], true) +
    lin('gFur', [[0, '#D9CBF0'], [1, '#FFFFFF']], true) +
    lin('gFox', [[0, '#E0662E'], [1, '#FFB45E']], true) +
    lin('gFrog', [[0, '#2E8F5A'], [1, '#9CE27A']], true) +
    lin('gBird', [[0, '#3C8FD6'], [1, '#A9DFFF']], true) +
    lin('gOwl', [[0, '#7A5CB0'], [1, '#C9B2F2']], true) +
    lin('gDuck', [[0, '#F5C53A'], [1, '#FFF3B8']], true) +
    lin('gHog', [[0, '#6E4630'], [1, '#B07A52']], true) +
    rad('gShell', [[0, '#FFE4F2'], [0.6, '#F49AC6'], [1, '#B06AD0']], 0.4, 0.4) +
    rad('gCore', [[0, '#FFF8D0'], [0.6, '#FFD45E'], [1, '#E99A2A']]) +
    rad('gHalo', [[0, '#FFF8DC', 0.9], [0.45, '#FFE0A8', 0.4], [1, '#FFE0A8', 0]]) +
    rad('gHaloC', [[0, '#E9FDFF', 0.95], [0.4, '#7FE6FF', 0.45], [1, '#7FE6FF', 0]]) +
    rad('gHaloP', [[0, '#FFF0F8', 0.95], [0.4, '#FF8FC8', 0.45], [1, '#FF8FC8', 0]]) +
    rad('gMoon', [[0, '#FFFBEA'], [0.7, '#FFE9C4'], [1, '#F7C6A6']], 0.42, 0.4) +
    rad('gMoonHalo', [[0, '#FFF1D6', 0.8], [0.35, '#FFB8D8', 0.35], [1, '#B78CFF', 0]]) +
    rad('gWater', [[0, '#B4E6CE'], [0.6, '#72BFA6'], [1, '#4A9482']], 0.5, 0.35) +
    rad('gCap', [[0, '#FFE2F0'], [0.5, '#E67AC0'], [1, '#8E3E9E']], 0.4, 0.35) +
    rad('gPuff', [[0, '#F4ECFF'], [0.6, '#BFA9F0'], [1, '#8E74D6']], 0.4, 0.35);
  var DEFS = '<filter id="wc" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="8" xChannelSelector="R" yChannelSelector="G"/></filter>' + GRADS;

  /* ---------- nét vẽ cơ bản ---------- */
  function leaf(x, y, len, a, grad, wide) {
    var w = len * (wide || 0.3);
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') rotate(' + n(a) + ')"><path d="M0 0C' + n(len * 0.25) + ' ' + n(-w * 1.05) + ' ' + n(len * 0.7) + ' ' + n(-w * 0.9) + ' ' + n(len) + ' 0C' + n(len * 0.7) + ' ' + n(w * 0.9) + ' ' + n(len * 0.25) + ' ' + n(w * 1.05) + ' 0 0Z" fill="url(#' + (grad || 'gLeaf') + ')"/>' +
      '<path d="M' + n(len * 0.06) + ' 0Q' + n(len * 0.5) + ' ' + n(-w * 0.12) + ' ' + n(len * 0.92) + ' 0" fill="none" stroke="#F4FFE0" stroke-opacity=".35" stroke-width="' + n(Math.max(1, len * 0.018)) + '" stroke-linecap="round"/></g>';
  }
  var HALOS = { gPetalC: 'gHaloC', gPetalH: 'gHaloP', gPetalL: 'gHaloP' };
  function bloom(x, y, r, k, grad, glow, rot) {
    rot = rot || 0;
    var o = glow ? '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r * 2.1) + '" fill="url(#' + (HALOS[grad] || 'gHalo') + ')"/>' : '';
    for (var i = 0; i < k; i++) {
      var a = rot - Math.PI / 2 + i * Math.PI * 2 / k, px = x + Math.cos(a) * r * 0.55, py = y + Math.sin(a) * r * 0.55;
      o += '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="' + n(r * 0.55) + '" ry="' + n(r * 0.33) + '" transform="rotate(' + deg(a) + ' ' + n(px) + ' ' + n(py) + ')" fill="url(#' + (grad || 'gPetalH') + ')"/>';
    }
    return o + '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r * 0.26) + '" fill="url(#gCore)"/>';
  }
  function bfly(x, y, s, c1, c2) {
    var o = '';
    [-1, 1].forEach(function (d) {
      var ux = x + d * s * 0.55, uy = y - s * 0.28, lx = x + d * s * 0.4, ly = y + s * 0.38;
      o += '<ellipse cx="' + n(ux) + '" cy="' + n(uy) + '" rx="' + n(s * 0.58) + '" ry="' + n(s * 0.42) + '" transform="rotate(' + (d * -28) + ' ' + n(ux) + ' ' + n(uy) + ')" fill="' + c1 + '" opacity=".95"/>' +
        '<ellipse cx="' + n(lx) + '" cy="' + n(ly) + '" rx="' + n(s * 0.36) + '" ry="' + n(s * 0.3) + '" transform="rotate(' + (d * 30) + ' ' + n(lx) + ' ' + n(ly) + ')" fill="' + c2 + '" opacity=".95"/>' +
        '<ellipse cx="' + n(x + d * s * 0.62) + '" cy="' + n(y - s * 0.38) + '" rx="' + n(s * 0.22) + '" ry="' + n(s * 0.14) + '" fill="#fff" opacity=".5"/>';
    });
    return o + '<ellipse cx="' + n(x) + '" cy="' + n(y + s * 0.06) + '" rx="' + n(s * 0.07) + '" ry="' + n(s * 0.48) + '" fill="#2B2540"/>' +
      '<path d="M' + n(x) + ' ' + n(y - s * 0.4) + 'Q' + n(x - s * 0.2) + ' ' + n(y - s * 0.8) + ' ' + n(x - s * 0.34) + ' ' + n(y - s * 0.86) +
      'M' + n(x) + ' ' + n(y - s * 0.4) + 'Q' + n(x + s * 0.2) + ' ' + n(y - s * 0.8) + ' ' + n(x + s * 0.34) + ' ' + n(y - s * 0.86) +
      '" fill="none" stroke="#2B2540" stroke-width="' + n(Math.max(1, s * 0.04)) + '" stroke-linecap="round"/>';
  }
  function tree(x, y, r, col, hi, sh, rnd) {
    var o = '<path d="M' + n(x - r * 0.09) + ' ' + n(y) + 'Q' + n(x - r * 0.05) + ' ' + n(y - r * 0.8) + ' ' + n(x - r * 0.02) + ' ' + n(y - r * 1.2) + 'H' + n(x + r * 0.04) + 'Q' + n(x + r * 0.07) + ' ' + n(y - r * 0.8) + ' ' + n(x + r * 0.11) + ' ' + n(y) + 'Z" fill="' + sh + '"/>';
    [[0, -1.5, 0.85], [-0.62, -1.15, 0.62], [0.64, -1.18, 0.66], [-0.28, -2.05, 0.6], [0.36, -1.95, 0.58]].forEach(function (b) {
      o += '<circle cx="' + n(x + b[0] * r) + '" cy="' + n(y + b[1] * r) + '" r="' + n(b[2] * r * (0.92 + rnd() * 0.16)) + '" fill="' + col + '"/>';
    });
    o += '<ellipse cx="' + n(x + r * 0.05) + '" cy="' + n(y - r * 0.85) + '" rx="' + n(r * 1.05) + '" ry="' + n(r * 0.3) + '" fill="' + sh + '" opacity=".4"/>';
    [[-0.35, -1.9, 0.38], [-0.7, -1.3, 0.28], [0.1, -1.65, 0.3]].forEach(function (b) { o += '<circle cx="' + n(x + b[0] * r) + '" cy="' + n(y + b[1] * r) + '" r="' + n(b[2] * r) + '" fill="' + hi + '" opacity=".7"/>'; });
    return o;
  }
  function grass(x, y, h, col, k, rnd) {
    var o = '';
    for (var i = 0; i < k; i++) {
      var dx = (rnd() - 0.5) * h * 0.5, hh = h * (0.6 + rnd() * 0.5), bend = (rnd() - 0.5) * h * 0.7, w = Math.max(1.5, h * 0.05);
      o += '<path d="M' + n(x + dx - w) + ' ' + n(y) + 'Q' + n(x + dx + bend * 0.4) + ' ' + n(y - hh * 0.6) + ' ' + n(x + dx + bend) + ' ' + n(y - hh) + 'Q' + n(x + dx + bend * 0.4 + w) + ' ' + n(y - hh * 0.55) + ' ' + n(x + dx + w) + ' ' + n(y) + 'Z" fill="' + col + '"/>';
    }
    return o;
  }

  /* ---------- cảnh nền dạng ô lặp liền mạch (trôi ngang theo hành trình) ---------- */
  /* đường đồi tuần hoàn: tổng các sóng sin có số chu kỳ nguyên trên bề rộng ô */
  function wave(TW, base, terms) { return function (x) { var y = base; terms.forEach(function (t) { y += t[0] * Math.sin(2 * Math.PI * t[1] * x / TW + t[2]); }); return y; }; }
  function hill(TW, H, f, fill) { var d = 'M0 ' + H; for (var x = 0; x <= TW; x += 16) d += 'L' + x + ' ' + n(f(x)); return '<path d="' + d + 'L' + TW + ' ' + H + 'Z" fill="' + fill + '"/>'; }
  /* vẽ ở x, x−TW, x+TW để mép ô nối khớp */
  function wrap(TW, x, draw) { return draw(x) + (x < 260 ? draw(x + TW) : '') + (x > TW - 260 ? draw(x - TW) : ''); }
  function tile(TW, TH, body) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + TW + '" height="' + TH + '" viewBox="0 0 ' + TW + ' ' + TH + '"><defs>' + GRADS + '</defs>' + body + '</svg>';
    try { return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })); } catch (e) { return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); }
  }
  var tiles = {};
  /* bụi lá tròn kiểu Hoa: nhiều lá rộng xòe quanh một gốc */
  function bush(x, y, r, grad, rnd, k) {
    var o = '';
    for (var i = 0; i < (k || 9); i++) {
      var a = -170 + i * 160 / ((k || 9) - 1) + (rnd() - 0.5) * 18;
      o += leaf(x + (rnd() - 0.5) * r * 0.3, y, r * (0.75 + rnd() * 0.45), a, grad, 0.42);
    }
    return o;
  }
  /* tán lá mờ: cụm tròn mềm chồng lên nhau */
  function puffs(TW, f, cnt, rMin, rMax, fill, op, rnd) {
    var o = '';
    for (var i = 0; i < cnt; i++) {
      var x = i * TW / cnt + rnd() * 30, r = rMin + rnd() * (rMax - rMin), y = f(x) + r * 0.35;
      o += wrap(TW, x, function (X) { return '<circle cx="' + n(X) + '" cy="' + n(y) + '" r="' + n(r) + '" fill="' + fill + '" opacity="' + op + '"/>'; });
    }
    return o;
  }
  var tiles = {};
  tiles.far = (function () {
    var TW = 1600, TH = 420, rnd = seeded(5), o = '';
    var f1 = wave(TW, 170, [[40, 2, 0.4], [26, 5, 1.3], [12, 9, 2.1]]), f2 = wave(TW, 250, [[30, 3, 2.2], [18, 7, 0.3]]);
    o += puffs(TW, f1, 30, 40, 80, '#D3E6BE', 1, rnd) + hill(TW, TH, f1, '#D3E6BE');
    for (var i = 0; i < 9; i++) { var tx = i * TW / 9 + rnd() * 60, th = 260 + rnd() * 120; o += wrap(TW, tx, function (X) { return '<rect x="' + n(X) + '" y="' + n(TH - th) + '" width="' + n(10 + rnd() * 6) + '" height="' + n(th) + '" fill="#C2DAAA" opacity=".8"/>'; }); }
    o += puffs(TW, f2, 34, 30, 64, '#BBD6A2', 1, rnd) + hill(TW, TH, f2, '#BBD6A2');
    return tile(TW, TH, o);
  })();
  tiles.mid = (function () {
    var TW = 1800, TH = 420, rnd = seeded(9), o = '', f = wave(TW, 330, [[14, 2, 1], [8, 5, 0.2]]);
    for (var i = 0; i < 16; i++) {
      var x = i * TW / 16 + rnd() * 40, r = 36 + rnd() * 28, y = f(x) + 6;
      o += wrap(TW, x, function (X) { return tree(X, y, r, '#8CBE76', '#C4E3A2', '#6E9F60', seeded(i + 3)); });
    }
    o += hill(TW, TH, f, '#86B870');
    for (var j = 0; j < 14; j++) { var bx = j * TW / 14 + rnd() * 50, br = 40 + rnd() * 30; o += wrap(TW, bx, function (X) { return bush(X, f(X) + 18, br, 'gLeafL', seeded(j + 40), 7); }); }
    return tile(TW, TH, o);
  })();
  tiles.near = (function () {
    var TW = 1600, TH = 300, rnd = seeded(13), o = '', f = wave(TW, 96, [[22, 2, 0.6], [10, 5, 2]]);
    o += hill(TW, TH, f, 'url(#gGround)');
    for (var k = 0; k < 12; k++) { var bx = k * TW / 12 + rnd() * 60, br = 44 + rnd() * 26; o += wrap(TW, bx, function (X) { return bush(X, f(X) + 24, br, 'gLeaf', seeded(k + 70), 8); }); }
    for (var i = 0; i < 64; i++) { var x = i * 25 + rnd() * 10; o += grass(x, f(x) + 14, 26 + rnd() * 22, rnd() < 0.5 ? '#5E9A46' : '#8CC266', 4, rnd); }
    var grads = ['gPetalW', 'gPetalG', 'gPetalW', 'gPetalH', 'gPetalW'];
    for (var j = 0; j < 32; j++) {
      var fx = 20 + j * 49 + rnd() * 20, fy = f(fx) + 30 + rnd() * 120, r = 5 + rnd() * 6, g = grads[j % 5], rot = rnd();
      o += '<path d="M' + n(fx) + ' ' + n(fy + 30) + 'Q' + n(fx - 4) + ' ' + n(fy + 14) + ' ' + n(fx) + ' ' + n(fy) + '" stroke="#5E9A46" stroke-width="2" fill="none"/>' + bloom(fx, fy, r, 5, g, true, rot);
    }
    return tile(TW, TH, o);
  })();
  tiles.fg = (function () {
    var TW = 1400, TH = 260, rnd = seeded(21), o = '';
    for (var i = 0; i < 7; i++) {
      var x = i * TW / 7 + rnd() * 80, r = 120 + rnd() * 60;
      o += wrap(TW, x, function (X) { return bush(X, TH + 20, r, 'gFg', seeded(i + 90), 11); });
    }
    return tile(TW, TH, o);
  })();
  /* tán lá rủ từ trên xuống, có dây leo */
  tiles.canopy = (function () {
    var TW = 1500, TH = 320, rnd = seeded(31), o = '';
    for (var i = 0; i < 26; i++) {
      var x = i * TW / 26 + rnd() * 30, r = 50 + rnd() * 50, y = -10 + rnd() * 30;
      o += wrap(TW, x, function (X) { return '<circle cx="' + n(X) + '" cy="' + n(y) + '" r="' + n(r) + '" fill="#A9CF8E" opacity=".85"/>'; });
    }
    for (var j = 0; j < 22; j++) {
      var lx = j * TW / 22 + rnd() * 40, ll = 60 + rnd() * 50, la = 40 + rnd() * 100, ly = 20 + rnd() * 40, gg = rnd() < 0.5 ? 'gLeaf' : 'gLeafL';
      o += wrap(TW, lx, function (X) { return leaf(X, ly, ll, la, gg, 0.42); });
    }
    for (var v = 0; v < 7; v++) {
      var vx = v * TW / 7 + rnd() * 80, vl = 140 + rnd() * 150, sw = (rnd() - 0.5) * 40;
      o += wrap(TW, vx, function (X) {
        var p = '<path d="M' + n(X) + ' 0Q' + n(X + sw) + ' ' + n(vl * 0.5) + ' ' + n(X + sw * 0.3) + ' ' + n(vl) + '" fill="none" stroke="#5E9A46" stroke-width="3" stroke-linecap="round"/>';
        for (var t = 0.2; t < 1; t += 0.2) { var py = vl * t, px = X + sw * (t < 0.5 ? t * 2 * 0.6 : 0.6 - (t - 0.5) * 0.6); p += leaf(px, py, 22, t * 400 % 2 < 1 ? 30 : 150, 'gLeafL', 0.45); }
        return p;
      });
    }
    return tile(TW, TH, o);
  })();

  /* ---------- đạo cụ các chặng ---------- */
  /* vòng nguyệt quế tốt nghiệp (viewBox 0 0 400 400, ảnh nằm trong vòng tròn bán kính ~118) */
  var wreath = (function () {
    var o = '<circle cx="200" cy="200" r="196" fill="url(#gHalo)"/><circle cx="200" cy="200" r="126" fill="#FFF8EC"/>';
    [-1, 1].forEach(function (side) {
      for (var i = 0; i < 13; i++) {
        var a = Math.PI / 2 + side * (0.35 + i * 0.2), x = 200 + Math.cos(a) * 140, y = 200 + Math.sin(a) * 140;
        var tang = a + side * Math.PI / 2;
        o += leaf(x, y, 46, deg(tang - side * 0.5), i % 2 ? 'gLeaf' : 'gLeafL', 0.36) + leaf(x, y, 40, deg(tang + side * 0.6), 'gLeafD', 0.34);
        if (i % 3 === 1) o += '<circle cx="' + n(200 + Math.cos(a) * 160) + '" cy="' + n(200 + Math.sin(a) * 160) + '" r="6" fill="#FFD45E"/>';
      }
    });
    o += '<circle cx="200" cy="200" r="126" fill="none" stroke="#F5C451" stroke-width="5"/>';
    /* nơ dưới chân vòng */
    o += '<path d="M200 334 L160 312 C150 330 152 350 166 356 Z M200 334 L240 312 C250 330 248 350 234 356 Z" fill="#F0508F"/>' +
      '<path d="M192 338 L176 392 L190 384 L198 396 L204 340 Z M208 338 L224 392 L210 384 L202 396 L196 340 Z" fill="#D9407E"/><circle cx="200" cy="336" r="12" fill="#FF8FC8"/>';
    return o;
  })();
  /* mặt trời lặn sau đồi được vẽ bằng CSS; sao giấy treo */
  function star5(cx, cy, R, fill) {
    var p = [];
    for (var i = 0; i < 10; i++) { var r = i % 2 ? R * 0.45 : R, a = -Math.PI / 2 + i * Math.PI / 5; p.push(n(cx + Math.cos(a) * r) + ',' + n(cy + Math.sin(a) * r)); }
    return '<polygon points="' + p.join(' ') + '" fill="' + fill + '" stroke="#fff" stroke-opacity=".6" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  /* khinh khí cầu (viewBox 0 0 160 220, màu theo color; ảnh nằm trong vòng tròn tâm (80,76) bán kính ~54) */
  var balloon =
    '<circle cx="80" cy="80" r="80" fill="currentColor" opacity=".18"/>' +
    '<path d="M80 6 C30 6 6 44 10 84 C14 120 50 140 62 158 L98 158 C110 140 146 120 150 84 C154 44 130 6 80 6 Z" fill="currentColor"/>' +
    '<path d="M80 6 C56 18 46 60 50 96 C54 124 60 144 66 158 L74 158 C68 140 62 120 60 96 C58 60 66 20 80 6 Z M80 6 C104 18 114 60 110 96 C106 124 100 144 94 158 L86 158 C92 140 98 120 100 96 C102 60 94 20 80 6 Z" fill="#fff" opacity=".22"/>' +
    '<path d="M38 30 C26 46 22 64 24 82" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="60" y="154" width="40" height="10" rx="4" fill="#7A4A6E"/>' +
    '<path d="M64 164 L68 190 M96 164 L92 190 M80 164 V190" stroke="#E9D9C0" stroke-width="2"/>' +
    '<rect x="62" y="188" width="36" height="26" rx="5" fill="url(#gWoodV)"/><path d="M62 196 H98 M62 204 H98 M74 188 V214 M86 188 V214" stroke="#3E2820" stroke-opacity=".35" stroke-width="2"/>';

  /* cây ước nguyện treo sao giấy (viewBox 0 0 600 760) */
  var bigTree = (function () {
    var rnd = seeded(31), o = '';
    o += '<path d="M250 760 C268 640 246 520 278 420 C296 360 268 300 296 236 L336 236 C352 320 330 384 350 444 C374 544 350 650 390 760 Z" fill="url(#gWoodV)"/>' +
      '<path d="M334 336 C404 304 474 300 572 262 L578 280 C486 320 414 330 344 360 Z" fill="url(#gWoodV)"/>' +
      '<path d="M284 330 C220 300 150 300 60 270 L56 286 C146 318 216 330 278 356 Z" fill="url(#gWoodV)"/>' +
      '<path d="M260 760 C230 740 200 744 170 760 M380 760 C410 738 450 742 480 760" stroke="#3E2820" stroke-width="12" fill="none" stroke-linecap="round"/>';
    var blobs = [[300, 170, 140], [180, 200, 100], [420, 200, 104], [240, 90, 96], [370, 92, 92], [120, 260, 70], [490, 262, 72], [300, 250, 110]];
    blobs.forEach(function (b) { o += '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="#5E9E48"/>'; });
    blobs.forEach(function (b) { o += '<circle cx="' + (b[0] - b[2] * 0.25) + '" cy="' + (b[1] - b[2] * 0.3) + '" r="' + (b[2] * 0.6) + '" fill="#86C062" opacity=".85"/>'; });
    blobs.forEach(function (b) { o += '<circle cx="' + (b[0] - b[2] * 0.4) + '" cy="' + (b[1] - b[2] * 0.45) + '" r="' + (b[2] * 0.28) + '" fill="#C6E89A" opacity=".6"/>'; });
    /* quả đèn sáng trên tán */
    for (var i = 0; i < 16; i++) {
      var x = 80 + rnd() * 440, y = 40 + rnd() * 280, h = ['gHaloP', 'gHaloC', 'gHalo'][i % 3];
      o += bloom(x, y, 11, 5, ['gPetalH', 'gPetalC', 'gPetalG'][i % 3], true, i);
    }
    /* sao giấy treo trên cành */
    [[110, 280, 60], [470, 290, 80], [540, 270, 50]].forEach(function (l, k) {
      o += '<path d="M' + l[0] + ' ' + l[1] + 'V' + (l[1] + l[2]) + '" stroke="#E9D9C0" stroke-width="2"/><circle cx="' + l[0] + '" cy="' + (l[1] + l[2] + 14) + '" r="34" fill="url(#' + ['gHaloP', 'gHaloC', 'gHalo'][k] + ')"/>' +
        star5(l[0], l[1] + l[2] + 14, 16, ['#FF9CC6', '#9FF0FF', '#FFE07A'][k]);
    });
    return o + grass(320, 760, 60, '#4E8A3C', 8, rnd) + grass(180, 760, 44, '#6FA852', 6, rnd);
  })();
  /* hồ nước (viewBox 0 0 1200 240) */
  var pond = (function () {
    var rnd = seeded(41), o = '<ellipse cx="600" cy="130" rx="600" ry="112" fill="#0F3A40"/><ellipse cx="600" cy="124" rx="584" ry="102" fill="url(#gWater)"/>';
    for (var i = 0; i < 14; i++) { var x = 120 + rnd() * 960, y = 70 + rnd() * 110, w = 40 + rnd() * 90; o += '<path d="M' + n(x - w) + ' ' + n(y) + 'Q' + n(x) + ' ' + n(y - 6) + ' ' + n(x + w) + ' ' + n(y) + '" stroke="#E9FFFF" stroke-opacity=".3" stroke-width="2" fill="none" stroke-linecap="round"/>'; }
    o += grass(40, 150, 80, '#123F42', 8, rnd) + grass(1160, 150, 80, '#123F42', 8, rnd) + grass(110, 196, 60, '#22685E', 6, rnd) + grass(1090, 196, 60, '#22685E', 6, rnd);
    o += bloom(70, 120, 12, 5, 'gPetalC', true) + bloom(1130, 116, 12, 5, 'gPetalH', true) + bloom(180, 210, 10, 5, 'gPetalG', true) + bloom(1020, 212, 10, 5, 'gPetalL', true);
    return o;
  })();
  /* lá sen (viewBox 0 0 200 80) */
  var lily = '<ellipse cx="100" cy="46" rx="100" ry="34" fill="#0E3A3C" opacity=".5"/>' +
    '<path d="M100 40 L196 34 C192 60 150 76 100 76 C48 76 4 62 4 40 C4 18 48 6 100 6 C140 6 176 14 192 26 Z" fill="url(#gPad)"/>' +
    '<path d="M100 40 L40 22 M100 40 L30 50 M100 40 L80 72 M100 40 L140 70" stroke="#C9F5C8" stroke-opacity=".3" stroke-width="2"/>';
  /* cổng hoa hình vòm (viewBox 0 0 800 440) */
  function garland() {
    var cx = 400, cy = 440, rx = 360, ry = 400, pts = [];
    for (var i = 0; i <= 48; i++) { var t = Math.PI + i / 48 * Math.PI; pts.push([cx + Math.cos(t) * rx, cy + Math.sin(t) * ry]); }
    var o = '<path d="M' + pts.map(function (p) { return n(p[0]) + ' ' + n(p[1]); }).join('L') + '" fill="none" stroke="#2A6A5C" stroke-width="7" stroke-linecap="round"/>';
    var lv = '', fl = '', grads = ['gPetalH', 'gPetalC', 'gPetalL', 'gPetalG', 'gPetalW'];
    for (var k = 1; k < 30; k++) {
      var tt = Math.PI + k / 30 * Math.PI, x = cx + Math.cos(tt) * rx, y = cy + Math.sin(tt) * ry, out = Math.atan2(Math.sin(tt) * rx, Math.cos(tt) * ry);
      lv += leaf(x, y, 50, deg(out + (k % 2 ? 0.8 : -0.8)), k % 2 ? 'gLeaf' : 'gLeafD') + leaf(x, y, 36, deg(out + Math.PI + (k % 2 ? -0.7 : 0.7)), 'gLeafL');
      if (k % 3 === 0) fl += bloom(x, y, 24 + (k % 2) * 6, k % 2 ? 6 : 5, grads[(k / 3) % 5], true, k);
    }
    return o + lv + fl + bloom(400, 40, 46, 6, 'gPetalW', true) + bfly(474, 74, 18, '#FF9CC6', '#B9A7F0');
  }
  /* cành cây ngang treo đèn lồng (viewBox 0 0 1000 120) */
  var branch =
    '<path d="M-20 52 C200 18 300 80 500 50 C700 22 820 70 1020 40 L1020 30 C820 58 700 10 500 38 C300 66 200 6 -20 40 Z" fill="url(#gWood)"/>' +
    leaf(80, 40, 64, -130, 'gLeaf') + leaf(110, 38, 58, 60, 'gLeafD') + leaf(300, 60, 66, -60, 'gLeaf') + leaf(330, 62, 58, 100, 'gLeafD') +
    leaf(640, 32, 62, -120, 'gLeafD') + leaf(680, 36, 56, 70, 'gLeaf') + leaf(900, 50, 64, -70, 'gLeaf') + leaf(930, 48, 54, 110, 'gLeafD') +
    bloom(200, 40, 22, 5, 'gPetalH', true) + bloom(420, 50, 18, 6, 'gPetalC', true) + bloom(760, 44, 22, 5, 'gPetalG', true);
  var mushroom =
    '<ellipse cx="85" cy="70" rx="95" ry="75" fill="url(#gHaloP)"/>' +
    '<path d="M64 96 Q58 140 62 160 Q85 168 108 160 Q112 140 106 96 Z" fill="#F4E6F2"/>' +
    '<path d="M10 98 C10 42 50 8 85 8 C120 8 160 42 160 98 Q85 116 10 98 Z" fill="url(#gCap)"/>' +
    [[52, 52, 9], [94, 34, 7], [128, 62, 10], [80, 76, 6], [30, 84, 5], [146, 88, 5]].map(function (d) { return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#FFF4FB" opacity=".9"/>'; }).join('');

  /* dây cờ đuôi nheo (viewBox 0 0 1000 130) */
  var bunting = (function () {
    var cols = ['#FF8FC8', '#FFD45E', '#7FE0C4', '#B79CFF', '#7FD8F2'], o = '<path d="M0 18 Q500 92 1000 18" fill="none" stroke="#FFF1D6" stroke-width="3"/>';
    for (var i = 0; i < 16; i++) {
      var t = (i + 0.5) / 16, x = t * 1000, y = 18 + 4 * t * (1 - t) * 74 * 0.98, c = cols[i % 5];
      o += '<path d="M' + n(x - 24) + ' ' + n(y) + 'L' + n(x + 24) + ' ' + n(y) + 'L' + n(x) + ' ' + n(y + 46) + 'Z" fill="' + c + '"/>' +
        '<path d="M' + n(x - 24) + ' ' + n(y) + 'L' + n(x - 4) + ' ' + n(y) + 'L' + n(x - 2) + ' ' + n(y + 30) + 'Z" fill="#fff" opacity=".3"/>' +
        '<circle cx="' + n(x) + '" cy="' + n(y + 14) + '" r="3.4" fill="#fff" opacity=".8"/>';
    }
    return o;
  })();
  /* mũ cử nhân (viewBox 0 0 160 120) */
  var gradCap =
    '<path d="M40 50 L40 82 Q80 102 120 82 L120 50 Z" fill="#3A3176"/><path d="M48 56 L48 80 Q80 94 112 80" fill="none" stroke="#5A4FA6" stroke-width="4"/>' +
    '<path d="M80 10 L152 40 L80 70 L8 40 Z" fill="#2E2766"/><path d="M80 14 L144 40 L80 66 Z" fill="#4A4096" opacity=".6"/>' +
    '<path d="M80 40 L130 48 L130 92" fill="none" stroke="#FFD45E" stroke-width="3.4" stroke-linecap="round"/>' +
    '<path d="M124 90 L136 90 L138 110 L122 110 Z" fill="#FFD45E"/><circle cx="80" cy="40" r="5" fill="#FFD45E"/>';
  /* cuộn bằng tốt nghiệp (viewBox 0 0 160 80) */
  var diploma =
    '<rect x="16" y="22" width="128" height="40" rx="8" fill="#FFF6E4"/><rect x="16" y="22" width="128" height="10" rx="5" fill="#F0DDBA" opacity=".7"/>' +
    '<ellipse cx="16" cy="42" rx="10" ry="20" fill="#F0DDBA"/><ellipse cx="16" cy="42" rx="4" ry="8" fill="#D9BF92"/>' +
    '<ellipse cx="144" cy="42" rx="10" ry="20" fill="#FFF1D6"/>' +
    '<rect x="72" y="20" width="16" height="44" fill="#E0558A"/><path d="M80 52 L66 76 L74 74 L78 80 Z M80 52 L94 76 L86 74 L82 80 Z" fill="#E0558A"/><circle cx="80" cy="46" r="9" fill="#FFD45E"/>';
  /* biểu tượng nhỏ (viewBox 0 0 48 48) */
  var iconHeart = '<circle cx="24" cy="24" r="24" fill="url(#gHaloP)"/><path d="M24 38 C10 28 6 20 9 14 C12 8 20 8 24 15 C28 8 36 8 39 14 C42 20 38 28 24 38 Z" fill="url(#gPetalH)"/>';
  var iconBook = '<circle cx="24" cy="24" r="24" fill="url(#gHaloC)"/><path d="M6 14 Q15 10 24 15 V38 Q15 33 6 37 Z" fill="#9FE8FF"/><path d="M42 14 Q33 10 24 15 V38 Q33 33 42 37 Z" fill="#D9FAFF"/><path d="M10 19 Q16 17 21 20 M10 25 Q16 23 21 26 M27 20 Q32 17 38 19 M27 26 Q32 23 38 25" stroke="#3C8FD6" stroke-opacity=".5" stroke-width="1.6" fill="none"/>';
  var iconStar = '<circle cx="24" cy="24" r="24" fill="url(#gHalo)"/><path d="M24 6 L29 19 L43 19 L32 28 L36 42 L24 33 L12 42 L16 28 L5 19 L19 19 Z" fill="url(#gPetalG)"/>';

  /* ---------- bướm 2.5D (viewBox 0 0 50 100, thân ở x=50, màu theo color) ---------- */
  var bWing =
    '<path d="M50 46 C42 20 20 2 7 10 C-2 16 2 38 14 47 C26 54 42 52 50 50 Z" fill="currentColor"/>' +
    '<path d="M50 53 C38 54 21 62 16 76 C11 91 28 98 39 87 C46 79 50 66 50 58 Z" fill="currentColor" opacity=".85"/>' +
    '<path d="M50 46 C42 20 20 2 7 10 C-2 16 2 38 14 47 C26 54 42 52 50 50 Z" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"/>' +
    '<path d="M47 45 C40 28 25 15 16 18 C10 21 13 34 22 41 C31 47 41 47 47 45 Z" fill="#fff" opacity=".45"/>' +
    '<path d="M47 58 C40 61 29 67 26 76 C24 83 31 86 37 80 C42 74 46 66 47 58 Z" fill="#fff" opacity=".3"/>' +
    '<circle cx="12" cy="20" r="3.4" fill="#fff" opacity=".9"/><circle cx="21" cy="12" r="2" fill="#fff" opacity=".7"/><circle cx="25" cy="84" r="3" fill="#FFF0C4"/>';
  var bBody =
    '<path d="M8.6 26 C5 14 3 9 1 5 M11.4 26 C15 14 17 9 19 5" fill="none" stroke="#2B2540" stroke-width="1.4" stroke-linecap="round"/>' +
    '<circle cx="1" cy="5" r="2" fill="#FFE58A"/><circle cx="19" cy="5" r="2" fill="#FFE58A"/>' +
    '<ellipse cx="10" cy="54" rx="3.6" ry="22" fill="#2B2540"/><circle cx="10" cy="30" r="4.6" fill="#2B2540"/>';

  /* ---------- các con vật (SVG chèn trực tiếp để CSS cử động từng bộ phận) ---------- */
  function eye(x, y, r) {
    return '<g class="cr-eye"><ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + n(r * 1.2) + '" fill="#231C33"/><circle cx="' + n(x + r * 0.35) + '" cy="' + n(y - r * 0.45) + '" r="' + n(r * 0.38) + '" fill="#fff"/></g>';
  }
  var SHADOW = function (cx, cy, rx) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + n(rx * 0.14) + '" fill="#06141A" opacity=".3"/>'; };
  var critters = {
    bunny: ['0 0 120 100', SHADOW(58, 95, 40) + '<g class="cr-body">' +
      '<circle class="cr-tail" cx="18" cy="60" r="10" fill="#fff"/>' +
      '<ellipse class="cr-leg cr-back" cx="36" cy="80" rx="17" ry="9" fill="#E6DAF2"/>' +
      '<ellipse cx="52" cy="62" rx="33" ry="24" fill="url(#gFur)"/>' +
      '<ellipse class="cr-leg cr-front" cx="72" cy="84" rx="8" ry="6" fill="#E6DAF2"/>' +
      '<g class="cr-ear"><ellipse cx="76" cy="20" rx="7" ry="20" transform="rotate(-18 76 20)" fill="url(#gFur)"/><ellipse cx="76" cy="21" rx="3.4" ry="14" transform="rotate(-18 76 21)" fill="#F7A9C6"/>' +
      '<ellipse cx="90" cy="18" rx="7" ry="20" transform="rotate(12 90 18)" fill="url(#gFur)"/><ellipse cx="90" cy="19" rx="3.4" ry="14" transform="rotate(12 90 19)" fill="#F7A9C6"/></g>' +
      '<circle cx="84" cy="48" r="20" fill="url(#gFur)"/>' + eye(92, 45, 3.6) +
      '<circle cx="103" cy="51" r="2.2" fill="#E77FA0"/><ellipse cx="89" cy="57" rx="5" ry="3" fill="#F7A9C6" opacity=".8"/></g>'],
    fox: ['0 0 150 92', SHADOW(78, 88, 52) + '<g class="cr-body">' +
      '<g class="cr-tail"><path d="M46 52 C20 60 -2 46 4 24 C8 12 22 14 24 24 C26 36 36 42 48 44 Z" fill="url(#gFox)"/><path d="M4 24 C8 12 22 14 24 24 C16 21 9 21 4 24 Z" fill="#fff"/></g>' +
      '<rect class="cr-leg cr-a" x="50" y="60" width="7" height="24" rx="3.5" fill="#6E3220"/><rect class="cr-leg cr-b" x="60" y="60" width="7" height="24" rx="3.5" fill="#8A4128"/>' +
      '<rect class="cr-leg cr-b" x="92" y="60" width="7" height="24" rx="3.5" fill="#6E3220"/><rect class="cr-leg cr-a" x="102" y="60" width="7" height="24" rx="3.5" fill="#8A4128"/>' +
      '<ellipse cx="78" cy="54" rx="35" ry="17" fill="url(#gFox)"/><ellipse cx="102" cy="60" rx="12" ry="9" fill="#FFF4E8"/>' +
      '<path d="M104 30 L106 8 L118 26 Z M114 26 L124 6 L128 30 Z" fill="#E0662E"/><path d="M106 14 L106 8 L111 15 Z M123 12 L124 6 L126 16 Z" fill="#3A1C14"/>' +
      '<circle cx="114" cy="40" r="16" fill="url(#gFox)"/><path d="M120 38 L144 46 L120 54 Z" fill="#FFF4E8"/><circle cx="144" cy="46" r="2.8" fill="#231C33"/>' + eye(122, 37, 2.8) + '</g>'],
    frog: ['0 0 110 84', SHADOW(56, 80, 40) + '<g class="cr-body">' +
      '<path class="cr-leg cr-back" d="M30 56 C10 58 8 76 26 76 L52 76 C44 70 40 62 30 56 Z" fill="#2E8F5A"/>' +
      '<ellipse cx="56" cy="52" rx="35" ry="24" fill="url(#gFrog)"/><ellipse cx="64" cy="60" rx="22" ry="13" fill="#EEF8CF"/>' +
      '<circle cx="52" cy="28" r="12" fill="url(#gFrog)"/><circle cx="76" cy="28" r="12" fill="url(#gFrog)"/>' +
      '<circle cx="52" cy="27" r="8" fill="#fff"/><circle cx="76" cy="27" r="8" fill="#fff"/>' + eye(54, 28, 4.2) + eye(78, 28, 4.2) +
      '<path d="M62 50 Q72 56 82 50" fill="none" stroke="#1E5A38" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="88" cy="48" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/>' +
      '<ellipse cx="80" cy="76" rx="9" ry="4.5" fill="#2E8F5A"/></g>'],
    puff: ['0 0 100 104', SHADOW(50, 100, 34) + '<g class="cr-body">' +
      '<path d="M38 30 C34 18 26 12 20 8 M62 30 C66 18 72 10 80 6" fill="none" stroke="#6E58B8" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="cr-orb"><circle cx="20" cy="8" r="12" fill="url(#gHaloC)"/><circle cx="20" cy="8" r="4.4" fill="#F2FEFF"/></g>' +
      '<g class="cr-orb cr-orb2"><circle cx="80" cy="6" r="12" fill="url(#gHaloC)"/><circle cx="80" cy="6" r="4.4" fill="#F2FEFF"/></g>' +
      [[50, 62, 34], [26, 66, 18], [74, 66, 18], [36, 42, 16], [64, 42, 16], [50, 36, 16]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="url(#gPuff)"/>'; }).join('') +
      '<ellipse cx="36" cy="46" rx="10" ry="6" fill="#fff" opacity=".4"/>' +
      '<circle cx="40" cy="60" r="9" fill="#fff"/><circle cx="62" cy="60" r="9" fill="#fff"/>' + eye(42, 61, 4.4) + eye(64, 61, 4.4) +
      '<ellipse cx="30" cy="74" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/><ellipse cx="72" cy="74" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/>' +
      '<ellipse class="cr-leg cr-a" cx="38" cy="94" rx="8" ry="5" fill="#8E74D6"/><ellipse class="cr-leg cr-b" cx="62" cy="94" rx="8" ry="5" fill="#8E74D6"/></g>'],
    /* cú mèo đậu cành (viewBox 0 0 100 112) */
    owl: ['0 0 100 112', '<g class="cr-body">' +
      '<ellipse class="cr-wing" cx="20" cy="66" rx="12" ry="26" fill="#6A4E9E"/><ellipse class="cr-wing cr-wing2" cx="80" cy="66" rx="12" ry="26" fill="#6A4E9E"/>' +
      '<path d="M24 30 L22 8 L40 22 Z M76 30 L78 8 L60 22 Z" fill="#7A5CB0"/>' +
      '<ellipse cx="50" cy="60" rx="34" ry="42" fill="url(#gOwl)"/><ellipse cx="50" cy="74" rx="22" ry="25" fill="#F3EAFF"/>' +
      '<path d="M40 70 l4 4 4 -4 M52 70 l4 4 4 -4 M46 80 l4 4 4 -4 M40 88 l4 4 4 -4 M52 88 l4 4 4 -4" fill="none" stroke="#B9A2E0" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="36" cy="44" r="14" fill="#fff"/><circle cx="64" cy="44" r="14" fill="#fff"/>' + eye(37, 45, 6) + eye(65, 45, 6) +
      '<path d="M46 54 L54 54 L50 63 Z" fill="#FFB347"/><ellipse cx="26" cy="58" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/><ellipse cx="74" cy="58" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/>' +
      '<path d="M38 100 l-4 8 M42 100 l0 9 M58 100 l0 9 M62 100 l4 8" stroke="#F0A030" stroke-width="3.4" stroke-linecap="round"/></g>'],
    /* vịt con trên mặt hồ (viewBox 0 0 112 84) */
    duck: ['0 0 112 84', '<ellipse cx="54" cy="72" rx="46" ry="7" fill="none" stroke="#E9FFFF" stroke-opacity=".55" stroke-width="2"/><ellipse cx="54" cy="76" rx="30" ry="4" fill="none" stroke="#E9FFFF" stroke-opacity=".35" stroke-width="1.6"/>' +
      '<g class="cr-body"><path d="M18 50 L4 38 L10 56 Z" fill="#F5C53A"/>' +
      '<ellipse cx="50" cy="56" rx="34" ry="18" fill="url(#gDuck)"/><ellipse class="cr-wing" cx="44" cy="52" rx="16" ry="9" fill="#F5C53A" opacity=".9"/>' +
      '<circle cx="80" cy="32" r="16" fill="url(#gDuck)"/><ellipse cx="97" cy="36" rx="9" ry="4.4" fill="#FF8A3D"/>' + eye(84, 29, 2.8) +
      '<ellipse cx="78" cy="40" rx="4.4" ry="2.6" fill="#FF9CC6" opacity=".8"/></g>'],
    /* nhím (viewBox 0 0 124 84) */
    hedgehog: ['0 0 124 84', SHADOW(62, 80, 44) + '<g class="cr-body">' +
      '<ellipse class="cr-leg cr-a" cx="40" cy="70" rx="7" ry="6" fill="#5A3A28"/><ellipse class="cr-leg cr-b" cx="78" cy="70" rx="7" ry="6" fill="#5A3A28"/>' +
      '<path d="M12 62 L8 46 L20 50 L16 32 L30 40 L32 20 L44 32 L52 12 L60 28 L72 14 L76 32 L90 24 L88 42 L100 42 L96 62 Z" fill="url(#gHog)"/>' +
      '<path d="M22 58 C22 34 46 22 66 26 C84 30 96 44 96 62 Z" fill="#8C5C3C" opacity=".55"/>' +
      '<path d="M84 62 C84 44 96 36 108 44 C118 50 120 58 110 64 Z" fill="#F4D6B4"/><circle cx="118" cy="56" r="4" fill="#2B2540"/>' + eye(102, 50, 2.8) +
      '<ellipse cx="102" cy="58" rx="4" ry="2.4" fill="#FF9CC6" opacity=".8"/>' +
      '<circle cx="46" cy="26" r="6" fill="#FF5E7A"/><path d="M46 20 q2 -5 6 -5" stroke="#3E9468" stroke-width="2" fill="none"/></g>'],
    /* ốc sên (viewBox 0 0 124 84) */
    snail: ['0 0 124 84', SHADOW(64, 80, 46) + '<g class="cr-body">' +
      '<path d="M10 76 C30 72 70 72 96 70 C104 60 104 44 108 34 L114 34 C114 48 114 64 110 76 Z" fill="#B6EEA4"/>' +
      '<g class="cr-ear"><path d="M106 36 L100 14 M112 36 L118 14" stroke="#8FD682" stroke-width="3" stroke-linecap="round"/><circle cx="100" cy="13" r="4" fill="#2B2540"/><circle cx="118" cy="13" r="4" fill="#2B2540"/></g>' +
      '<circle cx="56" cy="46" r="30" fill="url(#gShell)"/>' +
      '<path d="M56 46 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a13 13 0 1 1 -13 -13 a19 19 0 1 1 19 19" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="104" cy="58" rx="4" ry="2.4" fill="#FF9CC6" opacity=".8"/></g>'],
    bird: ['0 0 80 60', '<g class="cr-body">' +
      '<path d="M14 30 L0 22 L4 36 Z" fill="#3C8FD6"/>' +
      '<ellipse cx="36" cy="32" rx="22" ry="16" fill="url(#gBird)"/><ellipse cx="42" cy="38" rx="12" ry="8" fill="#FFF4E0"/>' +
      '<circle cx="56" cy="24" r="11" fill="url(#gBird)"/><path d="M66 22 L76 25 L66 28 Z" fill="#FFB347"/>' + eye(60, 22, 2.4) +
      '<path class="cr-wing" d="M30 28 C22 6 40 0 48 20 Z" fill="#2F7BC4"/></g>']
  };
  window.CritterArt = {};
  Object.keys(critters).forEach(function (k) { window.CritterArt[k] = '<svg viewBox="' + critters[k][0] + '" aria-hidden="true">' + critters[k][1] + '</svg>'; });
  window.SceneTiles = tiles;

  var symbols = {
    wreath: ['0 0 400 400', wreath],
    balloon: ['0 0 160 220', balloon],
    bigTree: ['0 0 600 760', bigTree],
    pond: ['0 0 1200 240', pond],
    lily: ['0 0 200 80', lily],
    garland: ['0 0 800 440', garland()],
    branch: ['0 0 1000 120', branch],
    mushroom: ['0 -10 170 180', mushroom],
    butterflyArt: ['0 0 200 200', bfly(100, 104, 50, '#FF9CC6', '#B9A7F0')],
    bunting: ['0 0 1000 130', bunting],
    gradCap: ['0 0 160 120', gradCap],
    diploma: ['0 0 160 80', diploma],
    iconHeart: ['0 0 48 48', iconHeart],
    iconBook: ['0 0 48 48', iconBook],
    iconStar: ['0 0 48 48', iconStar],
    bWing: ['0 0 50 100', bWing],
    bBody: ['0 0 20 100', bBody]
  };
  var html = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>' + DEFS + '</defs>';
  Object.keys(symbols).forEach(function (k) {
    html += '<symbol id="' + k + '" viewBox="' + symbols[k][0] + '"' + (symbols[k][2] ? ' preserveAspectRatio="' + symbols[k][2] + '"' : '') + '>' + symbols[k][1] + '</symbol>';
  });
  html += '</svg>';
  var holder = document.createElement('div');
  holder.innerHTML = html;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);
})();
