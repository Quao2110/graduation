/* ===== Bộ hình SVG kiểu tranh màu nước lúc hoàng hôn huyền ảo: cảnh rừng nhiều lớp, hoa phát sáng, cánh hoa, bướm, các con vật ===== */
(function () {
  'use strict';
  function n(v) { return Math.round(v * 10) / 10; }
  function deg(a) { return n(a * 180 / Math.PI); }
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  /* ---------- gradient, filter dùng chung ---------- */
  function stops(list) { return list.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] != null ? ' stop-opacity="' + s[2] + '"' : '') + '/>'; }).join(''); }
  /* ngang (trái → phải) hoặc dọc (dưới → trên) */
  function lin(id, list, vertical) { return '<linearGradient id="' + id + '" x1="0" y1="' + (vertical ? 1 : 0) + '" x2="' + (vertical ? 0 : 1) + '" y2="0">' + stops(list) + '</linearGradient>'; }
  function rad(id, list, cx, cy) { return '<radialGradient id="' + id + '" cx="' + (cx || 0.5) + '" cy="' + (cy || 0.5) + '" r=".5">' + stops(list) + '</radialGradient>'; }
  var DEFS =
    '<filter id="wc" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="8" xChannelSelector="R" yChannelSelector="G"/></filter>' +
    lin('gLeaf', [[0, '#1F6B5C'], [0.6, '#3FA486'], [1, '#8FE0B4']]) +
    lin('gLeafD', [[0, '#164C4A'], [0.7, '#2A7A6A'], [1, '#47A88A']]) +
    lin('gLeafL', [[0, '#3FA486'], [1, '#C9F5C8']]) +
    lin('gFg', [[0, '#07131E'], [0.7, '#10283A'], [1, '#1B3E50']]) +
    lin('gPetal', [[0, '#D9407E'], [0.5, '#F590B8'], [1, '#FFE4F0']], true) +
    lin('gPetalIn', [[0, '#F070A3'], [0.6, '#FFC2DA'], [1, '#FFF6FA']], true) +
    lin('gPetalH', [[0, '#F0508F'], [1, '#FFE0EE']]) +
    lin('gPetalW', [[0, '#E9D3E6'], [1, '#FFFFFF']]) +
    lin('gPetalL', [[0, '#8A5CE0'], [1, '#F0E2FF']]) +
    lin('gPetalG', [[0, '#F0A630'], [1, '#FFF3C4']]) +
    lin('gPetalC', [[0, '#26AFCF'], [1, '#D9FAFF']]) +
    lin('gStem', [[0, '#1F6B5C'], [0.5, '#56C08F'], [1, '#1F6B5C']]) +
    lin('gWood', [[0, '#5A3A2A'], [0.5, '#9C6F4A'], [1, '#5A3A2A']], true) +
    lin('gGround', [[0, '#123F45'], [0.6, '#1F6B62'], [1, '#3C9A80']], true) +
    lin('gFur', [[0, '#D9CBF0'], [1, '#FFFFFF']], true) +
    lin('gFox', [[0, '#E0662E'], [1, '#FFB45E']], true) +
    lin('gFrog', [[0, '#2E8F5A'], [1, '#9CE27A']], true) +
    lin('gBird', [[0, '#3C8FD6'], [1, '#A9DFFF']], true) +
    rad('gCore', [[0, '#FFF8D0'], [0.6, '#FFD45E'], [1, '#E99A2A']]) +
    rad('gHalo', [[0, '#FFF8DC', 0.9], [0.45, '#FFE0A8', 0.4], [1, '#FFE0A8', 0]]) +
    rad('gHaloC', [[0, '#E9FDFF', 0.95], [0.4, '#7FE6FF', 0.45], [1, '#7FE6FF', 0]]) +
    rad('gHaloP', [[0, '#FFF0F8', 0.95], [0.4, '#FF8FC8', 0.45], [1, '#FF8FC8', 0]]) +
    rad('gCap', [[0, '#FFE2F0'], [0.5, '#E67AC0'], [1, '#8E3E9E']], 0.4, 0.35) +
    rad('gPuff', [[0, '#F4ECFF'], [0.6, '#BFA9F0'], [1, '#8E74D6']], 0.4, 0.35);

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

  /* ---------- cảnh nền nhiều lớp ---------- */
  var far = (function () {
    var rnd = seeded(5), o = '<g filter="url(#wc)">';
    o += '<path d="M-40 420 V230 Q120 150 260 190 Q380 120 520 170 Q660 90 820 150 Q980 70 1120 160 Q1280 110 1480 190 V420 Z" fill="#7E6FC4"/>';
    for (var i = 0; i < 40; i++) o += '<circle cx="' + n(i * 38 + rnd() * 20) + '" cy="' + n(212 + Math.sin(i * 0.7) * 26 + rnd() * 14) + '" r="' + n(18 + rnd() * 16) + '" fill="#7366BA"/>';
    o += '<path d="M-40 420 V280 Q160 220 340 260 Q520 300 700 240 Q900 180 1080 250 Q1260 300 1480 240 V420 Z" fill="#5B5CA8"/>';
    for (var j = 0; j < 46; j++) o += '<circle cx="' + n(j * 33 + rnd() * 16) + '" cy="' + n(262 + Math.sin(j * 0.5 + 1) * 22 + rnd() * 10) + '" r="' + n(14 + rnd() * 14) + '" fill="#5257A0"/>';
    return o + '</g>';
  })();
  var mid = (function () {
    var rnd = seeded(9), o = '<g filter="url(#wc)">';
    for (var i = 0; i < 16; i++) o += tree(i * 96 + rnd() * 40 - 20, 330 + rnd() * 30, 34 + rnd() * 26, '#2F7A8A', '#56B3B8', '#22566E', rnd);
    o += '<path d="M-40 420 V330 Q200 300 420 322 Q660 346 900 316 Q1160 290 1480 320 V420 Z" fill="#2A6A78"/>';
    return o + '</g>';
  })();
  var near = (function () {
    var rnd = seeded(13), o = '<g filter="url(#wc)"><path d="M-40 300 V120 Q240 60 520 104 Q820 150 1100 88 Q1300 50 1480 96 V300 Z" fill="url(#gGround)"/></g>';
    for (var i = 0; i < 60; i++) o += grass(i * 25 + rnd() * 12, 118 + Math.sin(i * 0.25) * 22 + rnd() * 18, 30 + rnd() * 26, rnd() < 0.5 ? '#1A5450' : '#2D7E6C', 4, rnd);
    var grads = ['gPetalH', 'gPetalC', 'gPetalL', 'gPetalG', 'gPetalW'];
    for (var j = 0; j < 30; j++) {
      var fx = 24 + j * 48 + rnd() * 30, fy = 130 + rnd() * 120;
      o += '<path d="M' + n(fx) + ' ' + n(fy + 30) + 'Q' + n(fx - 4) + ' ' + n(fy + 14) + ' ' + n(fx) + ' ' + n(fy) + '" stroke="#1A5450" stroke-width="2" fill="none"/>' +
        bloom(fx, fy, 7 + rnd() * 7, 5, grads[j % 5], true, rnd());
    }
    for (var k = 0; k < 50; k++) o += grass(k * 30 + rnd() * 14, 300, 40 + rnd() * 30, rnd() < 0.5 ? '#0E3A3C' : '#1A5450', 3, rnd);
    return o;
  })();
  var fgLeaves = (function () {
    var o = '';
    [[-20, 900, 420, -62, 0.34], [-30, 880, 380, -38, 0.3], [0, 900, 330, -82, 0.28], [-40, 760, 300, -20, 0.3], [-20, 600, 260, -52, 0.32], [-10, 470, 220, -30, 0.3]]
      .forEach(function (l) { o += leaf(l[0], l[1], l[2], l[3], 'gFg', l[4]); });
    var pts = [];
    for (var i = 0; i <= 20; i++) { var t = i / 20; pts.push([40 + t * 260 + Math.sin(t * 3) * 20, 900 - t * 520]); }
    o += '<path d="M' + pts.map(function (p) { return n(p[0]) + ' ' + n(p[1]); }).join('L') + '" stroke="#0A1A26" stroke-width="5" fill="none" stroke-linecap="round"/>';
    pts.forEach(function (p, i) {
      if (i < 2 || i > 19) return;
      var s = 70 * (1 - i / 22);
      o += leaf(p[0], p[1], s, -150, 'gFg', 0.22) + leaf(p[0], p[1], s, -20, 'gFg', 0.22);
    });
    return o;
  })();

  /* ---------- nụ hoa lớn ---------- */
  function petalSym(grad) {
    return '<path d="M50 158 C14 132 4 66 24 26 C34 6 66 6 76 26 C96 66 86 132 50 158 Z" fill="url(#' + grad + ')"/>' +
      '<path d="M50 150 C34 124 26 78 36 42 C42 28 50 24 50 24 Z" fill="#fff" opacity=".25"/>' +
      '<path d="M50 152 C49 112 50 72 50 36" fill="none" stroke="#B03068" stroke-opacity=".25" stroke-width="2"/>' +
      '<path d="M50 158 C14 132 4 66 24 26 C34 6 66 6 76 26 C96 66 86 132 50 158 Z" fill="none" stroke="#FFE4F0" stroke-opacity=".6" stroke-width="1.5"/>';
  }
  var budStem =
    '<path d="M196 0 C186 80 214 170 196 300 H206 C222 170 198 80 206 0 Z" fill="url(#gStem)"/>' +
    leaf(198, 110, 140, 196, 'gLeaf', 0.32) + leaf(204, 160, 130, -16, 'gLeafD', 0.32) + leaf(200, 230, 100, 206, 'gLeafD', 0.3) + leaf(202, 252, 90, -28, 'gLeaf', 0.3);
  function petalRing() {
    var o = '<circle cx="100" cy="100" r="98" fill="url(#gHalo)"/>', inn = '';
    for (var i = 0; i < 12; i++) {
      var a = i / 12 * Math.PI * 2, px = 100 + Math.cos(a) * 74, py = 100 + Math.sin(a) * 74;
      o += '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="28" ry="17" transform="rotate(' + deg(a) + ' ' + n(px) + ' ' + n(py) + ')" fill="currentColor" opacity=".95"/>' +
        '<ellipse cx="' + n(100 + Math.cos(a) * 82) + '" cy="' + n(100 + Math.sin(a) * 82) + '" rx="14" ry="7" transform="rotate(' + deg(a) + ' ' + n(100 + Math.cos(a) * 82) + ' ' + n(100 + Math.sin(a) * 82) + ')" fill="#fff" opacity=".4"/>';
      var b = a + Math.PI / 12, qx = 100 + Math.cos(b) * 62, qy = 100 + Math.sin(b) * 62;
      inn += '<ellipse cx="' + n(qx) + '" cy="' + n(qy) + '" rx="19" ry="11" transform="rotate(' + deg(b) + ' ' + n(qx) + ' ' + n(qy) + ')" fill="#FFF4F8" opacity=".92"/>';
    }
    return o + inn;
  }
  var growStem = '<path d="M37 0 C28 60 52 130 37 220 H45 C60 130 36 60 45 0 Z" fill="url(#gStem)"/>' +
    leaf(40, 84, 54, 198, 'gLeaf', 0.32) + leaf(44, 140, 50, -20, 'gLeafD', 0.32);

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

  /* ---------- đạo cụ các mục ---------- */
  var branch =
    '<path d="M-20 52 C200 18 300 80 500 50 C700 22 820 70 1020 40 L1020 30 C820 58 700 10 500 38 C300 66 200 6 -20 40 Z" fill="url(#gWood)"/>' +
    leaf(80, 40, 64, -130, 'gLeaf') + leaf(110, 38, 58, 60, 'gLeafD') + leaf(300, 60, 66, -60, 'gLeaf') + leaf(330, 62, 58, 100, 'gLeafD') +
    leaf(640, 32, 62, -120, 'gLeafD') + leaf(680, 36, 56, 70, 'gLeaf') + leaf(900, 50, 64, -70, 'gLeaf') + leaf(930, 48, 54, 110, 'gLeafD') +
    bloom(96, 30, 26, 5, 'gPetalH', true) + bloom(316, 56, 20, 6, 'gPetalC', true) + bloom(500, 42, 24, 5, 'gPetalG', true) + bloom(660, 30, 20, 5, 'gPetalW', true) + bloom(916, 44, 26, 6, 'gPetalL', true) +
    bfly(800, 14, 15, '#7FD8F2', '#FF9CC6');
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
  var mushroom =
    '<ellipse cx="85" cy="70" rx="95" ry="75" fill="url(#gHaloP)"/>' +
    '<path d="M64 96 Q58 140 62 160 Q85 168 108 160 Q112 140 106 96 Z" fill="#F4E6F2"/>' +
    '<path d="M10 98 C10 42 50 8 85 8 C120 8 160 42 160 98 Q85 116 10 98 Z" fill="url(#gCap)"/>' +
    [[52, 52, 9], [94, 34, 7], [128, 62, 10], [80, 76, 6], [30, 84, 5], [146, 88, 5]].map(function (d) { return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#FFF4FB" opacity=".9"/>'; }).join('') +
    grass(60, 166, 34, '#1A5450', 5, seeded(3)) + grass(112, 166, 30, '#2D7E6C', 4, seeded(7));

  /* ---------- các con vật (SVG chèn trực tiếp để CSS cử động từng bộ phận) ---------- */
  function eye(x, y, r) {
    return '<g class="cr-eye"><ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + n(r * 1.2) + '" fill="#231C33"/><circle cx="' + n(x + r * 0.35) + '" cy="' + n(y - r * 0.45) + '" r="' + n(r * 0.38) + '" fill="#fff"/></g>';
  }
  var SHADOW = function (cx, cy, rx) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + n(rx * 0.14) + '" fill="#06141A" opacity=".3"/>'; };
  var critters = {
    /* thỏ (viewBox 0 0 120 100, quay sang phải) */
    bunny: ['0 0 120 100', SHADOW(58, 95, 40) + '<g class="cr-body">' +
      '<circle class="cr-tail" cx="18" cy="60" r="10" fill="#fff"/>' +
      '<ellipse class="cr-leg cr-back" cx="36" cy="80" rx="17" ry="9" fill="#E6DAF2"/>' +
      '<ellipse cx="52" cy="62" rx="33" ry="24" fill="url(#gFur)"/>' +
      '<ellipse class="cr-leg cr-front" cx="72" cy="84" rx="8" ry="6" fill="#E6DAF2"/>' +
      '<g class="cr-ear"><ellipse cx="76" cy="20" rx="7" ry="20" transform="rotate(-18 76 20)" fill="url(#gFur)"/><ellipse cx="76" cy="21" rx="3.4" ry="14" transform="rotate(-18 76 21)" fill="#F7A9C6"/>' +
      '<ellipse cx="90" cy="18" rx="7" ry="20" transform="rotate(12 90 18)" fill="url(#gFur)"/><ellipse cx="90" cy="19" rx="3.4" ry="14" transform="rotate(12 90 19)" fill="#F7A9C6"/></g>' +
      '<circle cx="84" cy="48" r="20" fill="url(#gFur)"/>' + eye(92, 45, 3.6) +
      '<circle cx="103" cy="51" r="2.2" fill="#E77FA0"/><ellipse cx="89" cy="57" rx="5" ry="3" fill="#F7A9C6" opacity=".8"/></g>'],
    /* cáo nhỏ (viewBox 0 0 150 92) */
    fox: ['0 0 150 92', SHADOW(78, 88, 52) + '<g class="cr-body">' +
      '<g class="cr-tail"><path d="M46 52 C20 60 -2 46 4 24 C8 12 22 14 24 24 C26 36 36 42 48 44 Z" fill="url(#gFox)"/><path d="M4 24 C8 12 22 14 24 24 C16 21 9 21 4 24 Z" fill="#fff"/></g>' +
      '<rect class="cr-leg cr-a" x="50" y="60" width="7" height="24" rx="3.5" fill="#6E3220"/><rect class="cr-leg cr-b" x="60" y="60" width="7" height="24" rx="3.5" fill="#8A4128"/>' +
      '<rect class="cr-leg cr-b" x="92" y="60" width="7" height="24" rx="3.5" fill="#6E3220"/><rect class="cr-leg cr-a" x="102" y="60" width="7" height="24" rx="3.5" fill="#8A4128"/>' +
      '<ellipse cx="78" cy="54" rx="35" ry="17" fill="url(#gFox)"/><ellipse cx="102" cy="60" rx="12" ry="9" fill="#FFF4E8"/>' +
      '<path d="M104 30 L106 8 L118 26 Z M114 26 L124 6 L128 30 Z" fill="#E0662E"/><path d="M106 14 L106 8 L111 15 Z M123 12 L124 6 L126 16 Z" fill="#3A1C14"/>' +
      '<circle cx="114" cy="40" r="16" fill="url(#gFox)"/><path d="M120 38 L144 46 L120 54 Z" fill="#FFF4E8"/><circle cx="144" cy="46" r="2.8" fill="#231C33"/>' + eye(122, 37, 2.8) + '</g>'],
    /* ếch (viewBox 0 0 110 84) */
    frog: ['0 0 110 84', SHADOW(56, 80, 40) + '<g class="cr-body">' +
      '<path class="cr-leg cr-back" d="M30 56 C10 58 8 76 26 76 L52 76 C44 70 40 62 30 56 Z" fill="#2E8F5A"/>' +
      '<ellipse cx="56" cy="52" rx="35" ry="24" fill="url(#gFrog)"/><ellipse cx="64" cy="60" rx="22" ry="13" fill="#EEF8CF"/>' +
      '<circle cx="52" cy="28" r="12" fill="url(#gFrog)"/><circle cx="76" cy="28" r="12" fill="url(#gFrog)"/>' +
      '<circle cx="52" cy="27" r="8" fill="#fff"/><circle cx="76" cy="27" r="8" fill="#fff"/>' + eye(54, 28, 4.2) + eye(78, 28, 4.2) +
      '<path d="M62 50 Q72 56 82 50" fill="none" stroke="#1E5A38" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="88" cy="48" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/>' +
      '<ellipse cx="80" cy="76" rx="9" ry="4.5" fill="#2E8F5A"/></g>'],
    /* cục bông có râu phát sáng (viewBox 0 0 100 104) */
    puff: ['0 0 100 104', SHADOW(50, 100, 34) + '<g class="cr-body">' +
      '<path d="M38 30 C34 18 26 12 20 8 M62 30 C66 18 72 10 80 6" fill="none" stroke="#6E58B8" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="cr-orb"><circle cx="20" cy="8" r="12" fill="url(#gHaloC)"/><circle cx="20" cy="8" r="4.4" fill="#F2FEFF"/></g>' +
      '<g class="cr-orb cr-orb2"><circle cx="80" cy="6" r="12" fill="url(#gHaloC)"/><circle cx="80" cy="6" r="4.4" fill="#F2FEFF"/></g>' +
      [[50, 62, 34], [26, 66, 18], [74, 66, 18], [36, 42, 16], [64, 42, 16], [50, 36, 16]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="url(#gPuff)"/>'; }).join('') +
      '<ellipse cx="36" cy="46" rx="10" ry="6" fill="#fff" opacity=".4"/>' +
      '<circle cx="40" cy="60" r="9" fill="#fff"/><circle cx="62" cy="60" r="9" fill="#fff"/>' + eye(42, 61, 4.4) + eye(64, 61, 4.4) +
      '<ellipse cx="30" cy="74" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/><ellipse cx="72" cy="74" rx="5" ry="3" fill="#FF9CC6" opacity=".8"/>' +
      '<ellipse class="cr-leg cr-a" cx="38" cy="94" rx="8" ry="5" fill="#8E74D6"/><ellipse class="cr-leg cr-b" cx="62" cy="94" rx="8" ry="5" fill="#8E74D6"/></g>'],
    /* chim nhỏ (viewBox 0 0 80 60) */
    bird: ['0 0 80 60', '<g class="cr-body">' +
      '<path d="M14 30 L0 22 L4 36 Z" fill="#3C8FD6"/>' +
      '<ellipse cx="36" cy="32" rx="22" ry="16" fill="url(#gBird)"/><ellipse cx="42" cy="38" rx="12" ry="8" fill="#FFF4E0"/>' +
      '<circle cx="56" cy="24" r="11" fill="url(#gBird)"/><path d="M66 22 L76 25 L66 28 Z" fill="#FFB347"/>' + eye(60, 22, 2.4) +
      '<path class="cr-wing" d="M30 28 C22 6 40 0 48 20 Z" fill="#2F7BC4"/></g>']
  };
  window.CritterArt = {};
  Object.keys(critters).forEach(function (k) { window.CritterArt[k] = '<svg viewBox="' + critters[k][0] + '" aria-hidden="true">' + critters[k][1] + '</svg>'; });

  var symbols = {
    far: ['0 0 1440 420', far, 'xMidYMin slice'],
    mid: ['0 0 1440 420', mid, 'xMidYMin slice'],
    near: ['0 0 1440 300', near, 'xMidYMin slice'],
    fgLeaves: ['0 0 500 900', fgLeaves],
    petal: ['0 0 100 160', petalSym('gPetal')],
    petalIn: ['0 0 100 160', petalSym('gPetalIn')],
    budStem: ['0 0 400 300', budStem],
    petalRing: ['0 0 200 200', petalRing()],
    growStem: ['0 0 80 220', growStem],
    mushroom: ['0 -10 170 180', mushroom],
    branch: ['0 0 1000 120', branch],
    garland: ['0 0 800 440', garland()],
    butterflyArt: ['0 0 200 200', bfly(100, 104, 50, '#FF9CC6', '#B9A7F0')],
    bWing: ['0 0 50 100', bWing],
    bBody: ['0 0 20 100', bBody],
    flower: ['0 0 40 40', bloom(20, 20, 18, 5, 'gPetalW')],
    heart: ['0 0 40 40', '<path d="M20 34 C8 25 4 18 6 12 C8 6 16 5 20 12 C24 5 32 6 34 12 C36 18 32 25 20 34 Z" fill="url(#gPetalH)"/>']
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
