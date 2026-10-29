/* ===== Bộ hình SVG vườn hoa ban ngày: cánh hoa, vòng cánh, thân hoa, bướm, mặt trời, mây, đồi, cành cây, cổng hoa, nấm ===== */
(function () {
  'use strict';
  var INK = '#3A1F4D', YEL = '#FFC93C', SUN = '#FFB020', PINK = '#FF8FCB', PINK_L = '#FFC6E4', WHITE = '#FFFFFF',
      LEAF = '#5DBB8A', LEAF_D = '#3E9468', LEAF_L = '#A8E6C1', ROSE = '#FF6F9F', ROSE_D = '#D94C80',
      PEACH = '#FFB38A', PEACH_D = '#E58A5C', LILAC = '#B79CFF', SKY = '#7FD6FF', WOOD = '#B07A4E', WOOD_L = '#D9A273';
  function n(v) { return Math.round(v * 10) / 10; }
  function deg(a) { return n(a * 180 / Math.PI); }

  function spark(x, y, r, fill, sw, st) {
    fill = fill || WHITE; sw = sw == null ? 1.6 : sw;
    var k = r * 0.2;
    return '<path d="M' + n(x) + ' ' + n(y - r) + 'Q' + n(x + k) + ' ' + n(y - k) + ' ' + n(x + r) + ' ' + n(y) +
      'Q' + n(x + k) + ' ' + n(y + k) + ' ' + n(x) + ' ' + n(y + r) + 'Q' + n(x - k) + ' ' + n(y + k) + ' ' + n(x - r) + ' ' + n(y) +
      'Q' + n(x - k) + ' ' + n(y - k) + ' ' + n(x) + ' ' + n(y - r) + 'Z" fill="' + fill + '" stroke="' + (st || INK) + '" stroke-width="' + sw + '" stroke-linejoin="round"/>';
  }
  function cloud(x, y, s, o) {
    o = o == null ? 3 : o;
    var parts = [[-0.95, 0.12, 0.5], [-0.38, -0.3, 0.68], [0.34, -0.14, 0.6], [0.95, 0.16, 0.46]], a = '', b = '';
    parts.forEach(function (p) {
      a += '<circle cx="' + n(x + p[0] * s) + '" cy="' + n(y + p[1] * s) + '" r="' + n(p[2] * s + o) + '"/>';
      b += '<circle cx="' + n(x + p[0] * s) + '" cy="' + n(y + p[1] * s) + '" r="' + n(p[2] * s) + '"/>';
    });
    var rx = x - 1.4 * s, rw = 2.8 * s, rh = 0.62 * s;
    a += '<rect x="' + n(rx - o) + '" y="' + n(y - o) + '" width="' + n(rw + 2 * o) + '" height="' + n(rh + 2 * o) + '" rx="' + n(rh / 2 + o) + '"/>';
    b += '<rect x="' + n(rx) + '" y="' + n(y) + '" width="' + n(rw) + '" height="' + n(rh) + '" rx="' + n(rh / 2) + '"/>';
    return '<g fill="' + INK + '">' + a + '</g><g fill="' + WHITE + '">' + b + '</g>' +
      '<ellipse cx="' + n(x - s * 0.5) + '" cy="' + n(y - s * 0.38) + '" rx="' + n(s * 0.22) + '" ry="' + n(s * 0.1) + '" fill="#E3F4FF"/>';
  }
  function arc(cx, cy, r, a1, a2, color, w) {
    var t1 = a1 * Math.PI / 180, t2 = a2 * Math.PI / 180;
    return '<path d="M' + n(cx + Math.cos(t1) * r) + ' ' + n(cy + Math.sin(t1) * r) + 'A' + r + ' ' + r + ' 0 0 1 ' + n(cx + Math.cos(t2) * r) + ' ' + n(cy + Math.sin(t2) * r) +
      '" fill="none" stroke="' + (color || WHITE) + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" opacity=".9"/>';
  }
  function face(cx, cy, s) {
    var e = s * 0.24;
    return '<path d="M' + n(cx - e - s * 0.12) + ' ' + n(cy) + 'Q' + n(cx - e) + ' ' + n(cy - s * 0.16) + ' ' + n(cx - e + s * 0.12) + ' ' + n(cy) +
      'M' + n(cx + e - s * 0.12) + ' ' + n(cy) + 'Q' + n(cx + e) + ' ' + n(cy - s * 0.16) + ' ' + n(cx + e + s * 0.12) + ' ' + n(cy) +
      '" fill="none" stroke="' + INK + '" stroke-width="' + n(s * 0.075) + '" stroke-linecap="round"/>' +
      '<path d="M' + n(cx - s * 0.26) + ' ' + n(cy + s * 0.2) + 'Q' + n(cx) + ' ' + n(cy + s * 0.62) + ' ' + n(cx + s * 0.26) + ' ' + n(cy + s * 0.2) + 'Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="' + n(s * 0.05) + '" stroke-linejoin="round"/>' +
      '<ellipse cx="' + cx + '" cy="' + n(cy + s * 0.4) + '" rx="' + n(s * 0.13) + '" ry="' + n(s * 0.07) + '" fill="' + PINK + '"/>' +
      '<circle cx="' + n(cx - s * 0.45) + '" cy="' + n(cy + s * 0.22) + '" r="' + n(s * 0.13) + '" fill="' + PINK + '" opacity=".85"/>' +
      '<circle cx="' + n(cx + s * 0.45) + '" cy="' + n(cy + s * 0.22) + '" r="' + n(s * 0.13) + '" fill="' + PINK + '" opacity=".85"/>';
  }

  /* ---------- hoa, lá, bướm ---------- */
  /* hoa k cánh elip quanh nhụy */
  function bloom(x, y, r, k, fill, core, sw, rot) {
    sw = sw == null ? 2.2 : sw; rot = rot || 0;
    var o = '';
    for (var i = 0; i < k; i++) {
      var a = rot - Math.PI / 2 + i * Math.PI * 2 / k, px = x + Math.cos(a) * r * 0.55, py = y + Math.sin(a) * r * 0.55;
      o += '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="' + n(r * 0.52) + '" ry="' + n(r * 0.34) + '" transform="rotate(' + deg(a) + ' ' + n(px) + ' ' + n(py) + ')" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + sw + '"/>';
    }
    return o + '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r * 0.3) + '" fill="' + (core || YEL) + '" stroke="' + INK + '" stroke-width="' + sw + '"/>' +
      '<circle cx="' + n(x - r * 0.1) + '" cy="' + n(y - r * 0.1) + '" r="' + n(r * 0.09) + '" fill="#fff" opacity=".85"/>';
  }
  /* lá hình hạt: gốc (x,y), dài len, góc a (độ) */
  function leaf(x, y, len, a, fill, sw) {
    var w = len * 0.34;
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') rotate(' + n(a) + ')"><path d="M0 0Q' + n(len * 0.45) + ' ' + n(-w) + ' ' + n(len) + ' 0Q' + n(len * 0.45) + ' ' + n(w) + ' 0 0Z" fill="' + (fill || LEAF) + '" stroke="' + INK + '" stroke-width="' + (sw || 2.4) + '" stroke-linejoin="round"/>' +
      '<path d="M' + n(len * 0.12) + ' 0H' + n(len * 0.78) + '" stroke="' + LEAF_L + '" stroke-width="' + n(Math.max(1.2, len * 0.05)) + '" stroke-linecap="round" opacity=".9"/></g>';
  }
  /* hoa hồng: vòng tròn và các nét xoắn */
  function rose(x, y, r, fill, dark) {
    fill = fill || ROSE; dark = dark || ROSE_D;
    return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r) + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + n(Math.max(2, r * 0.12)) + '"/>' +
      '<path d="M' + n(x - r * 0.62) + ' ' + n(y + r * 0.1) + 'Q' + n(x - r * 0.5) + ' ' + n(y + r * 0.72) + ' ' + n(x + r * 0.12) + ' ' + n(y + r * 0.62) +
      'M' + n(x + r * 0.66) + ' ' + n(y - r * 0.05) + 'Q' + n(x + r * 0.6) + ' ' + n(y - r * 0.7) + ' ' + n(x - r * 0.05) + ' ' + n(y - r * 0.66) +
      'M' + n(x - r * 0.3) + ' ' + n(y - r * 0.15) + 'Q' + n(x - r * 0.1) + ' ' + n(y - r * 0.45) + ' ' + n(x + r * 0.28) + ' ' + n(y - r * 0.2) +
      'Q' + n(x + r * 0.35) + ' ' + n(y + r * 0.25) + ' ' + n(x) + ' ' + n(y + r * 0.22) + 'Q' + n(x - r * 0.18) + ' ' + n(y + r * 0.05) + ' ' + n(x) + ' ' + n(y - r * 0.05) +
      '" fill="none" stroke="' + dark + '" stroke-width="' + n(Math.max(1.6, r * 0.11)) + '" stroke-linecap="round"/>' +
      '<ellipse cx="' + n(x - r * 0.4) + '" cy="' + n(y - r * 0.42) + '" rx="' + n(r * 0.16) + '" ry="' + n(r * 0.09) + '" transform="rotate(-35 ' + n(x - r * 0.4) + ' ' + n(y - r * 0.42) + ')" fill="#fff" opacity=".7"/>';
  }
  /* bướm phẳng: thân ở (x,y), mỗi cánh rộng ~ s */
  function bfly(x, y, s, c1, c2) {
    c1 = c1 || PINK; c2 = c2 || LILAC;
    var o = '', sw = n(Math.max(1.6, s * 0.07));
    [-1, 1].forEach(function (d) {
      var ux = x + d * s * 0.55, uy = y - s * 0.28, lx = x + d * s * 0.4, ly = y + s * 0.38;
      o += '<ellipse cx="' + n(ux) + '" cy="' + n(uy) + '" rx="' + n(s * 0.58) + '" ry="' + n(s * 0.42) + '" transform="rotate(' + (d * -28) + ' ' + n(ux) + ' ' + n(uy) + ')" fill="' + c1 + '" stroke="' + INK + '" stroke-width="' + sw + '"/>' +
        '<ellipse cx="' + n(lx) + '" cy="' + n(ly) + '" rx="' + n(s * 0.36) + '" ry="' + n(s * 0.3) + '" transform="rotate(' + (d * 30) + ' ' + n(lx) + ' ' + n(ly) + ')" fill="' + c2 + '" stroke="' + INK + '" stroke-width="' + sw + '"/>' +
        '<circle cx="' + n(x + d * s * 0.66) + '" cy="' + n(y - s * 0.36) + '" r="' + n(s * 0.14) + '" fill="#fff" opacity=".85"/>' +
        '<circle cx="' + n(x + d * s * 0.45) + '" cy="' + n(y + s * 0.42) + '" r="' + n(s * 0.09) + '" fill="' + YEL + '"/>';
    });
    return o + '<ellipse cx="' + n(x) + '" cy="' + n(y + s * 0.06) + '" rx="' + n(s * 0.09) + '" ry="' + n(s * 0.5) + '" fill="' + INK + '"/>' +
      '<path d="M' + n(x - s * 0.04) + ' ' + n(y - s * 0.4) + 'Q' + n(x - s * 0.2) + ' ' + n(y - s * 0.8) + ' ' + n(x - s * 0.36) + ' ' + n(y - s * 0.86) +
      'M' + n(x + s * 0.04) + ' ' + n(y - s * 0.4) + 'Q' + n(x + s * 0.2) + ' ' + n(y - s * 0.8) + ' ' + n(x + s * 0.36) + ' ' + n(y - s * 0.86) +
      '" fill="none" stroke="' + INK + '" stroke-width="' + n(Math.max(1.4, s * 0.06)) + '" stroke-linecap="round"/>' +
      '<circle cx="' + n(x - s * 0.36) + '" cy="' + n(y - s * 0.86) + '" r="' + n(s * 0.07) + '" fill="' + INK + '"/><circle cx="' + n(x + s * 0.36) + '" cy="' + n(y - s * 0.86) + '" r="' + n(s * 0.07) + '" fill="' + INK + '"/>';
  }
  /* cánh bướm 2.5D (viewBox 0 0 50 100, thân ở x=50, màu lấy theo color của CSS) */
  var bWing =
    '<path d="M50 46 C42 20 20 2 7 10 C-2 16 2 38 14 47 C26 54 42 52 50 50 Z" fill="currentColor" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M50 53 C38 54 21 62 16 76 C11 91 28 98 39 87 C46 79 50 66 50 58 Z" fill="currentColor" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M47 45 C40 28 25 15 16 18 C10 21 13 34 22 41 C31 47 41 47 47 45 Z" fill="#fff" opacity=".42"/>' +
    '<path d="M47 58 C40 61 29 67 26 76 C24 83 31 86 37 80 C42 74 46 66 47 58 Z" fill="#fff" opacity=".35"/>' +
    '<circle cx="12" cy="20" r="4.5" fill="#fff" stroke="' + INK + '" stroke-width="1.6"/><circle cx="22" cy="12" r="2.6" fill="#fff"/>' +
    '<circle cx="24" cy="84" r="4" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.4"/><circle cx="6" cy="30" r="2.2" fill="#fff"/>';
  var bBody =
    '<path d="M8.6 26 C5 14 3 9 1 5 M11.4 26 C15 14 17 9 19 5" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>' +
    '<circle cx="1" cy="5" r="2.4" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="19" cy="5" r="2.4" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.2"/>' +
    '<ellipse cx="10" cy="54" rx="5" ry="24" fill="' + INK + '"/><circle cx="10" cy="29" r="6" fill="' + INK + '"/>' +
    '<ellipse cx="8.4" cy="46" rx="1.6" ry="8" fill="#fff" opacity=".35"/>';

  /* ---------- nụ hoa lớn ---------- */
  /* một cánh hoa 2.5D (viewBox 0 0 100 160, gốc ở đáy giữa, màu theo color của CSS) */
  var petal =
    '<path d="M50 158 C14 132 4 66 24 26 C34 6 66 6 76 26 C96 66 86 132 50 158 Z" fill="currentColor" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M50 148 C30 126 22 76 34 40 C40 24 50 20 50 20 Z" fill="#fff" opacity=".28"/>' +
    '<path d="M50 150 C48 110 50 70 50 34" fill="none" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round" opacity=".28"/>' +
    '<ellipse cx="36" cy="40" rx="5" ry="10" transform="rotate(-20 36 40)" fill="#fff" opacity=".75"/>';
  /* thân nụ hoa (viewBox 0 0 400 300) */
  var budStem =
    '<path d="M200 0 C186 80 216 170 198 300" fill="none" stroke="' + INK + '" stroke-width="28" stroke-linecap="round"/>' +
    '<path d="M200 0 C186 80 216 170 198 300" fill="none" stroke="' + LEAF + '" stroke-width="17" stroke-linecap="round"/>' +
    '<path d="M194 20 C184 90 208 160 194 260" fill="none" stroke="' + LEAF_L + '" stroke-width="4" stroke-linecap="round" stroke-dasharray="40 26"/>' +
    leaf(198, 110, 130, 200, LEAF, 5) + leaf(204, 160, 120, -18, LEAF_D, 5) + leaf(200, 230, 90, 210, LEAF_D, 4.5) + leaf(202, 250, 84, -30, LEAF, 4.5);
  /* vòng cánh quanh khung ảnh tròn (viewBox 0 0 200 200, màu theo color) */
  function petalRing() {
    var o = '', inn = '';
    for (var i = 0; i < 12; i++) {
      var a = i / 12 * Math.PI * 2, px = 100 + Math.cos(a) * 74, py = 100 + Math.sin(a) * 74;
      o += '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="28" ry="18" transform="rotate(' + deg(a) + ' ' + n(px) + ' ' + n(py) + ')" fill="currentColor" stroke="' + INK + '" stroke-width="4"/>';
      var b = a + Math.PI / 12, qx = 100 + Math.cos(b) * 62, qy = 100 + Math.sin(b) * 62;
      inn += '<ellipse cx="' + n(qx) + '" cy="' + n(qy) + '" rx="19" ry="12" transform="rotate(' + deg(b) + ' ' + n(qx) + ' ' + n(qy) + ')" fill="#FFF0F6" stroke="' + INK + '" stroke-width="3"/>';
    }
    return o + inn;
  }
  /* thân hoa nhỏ cho mục ba đóa hoa (viewBox 0 0 80 220) */
  var growStem =
    '<path d="M40 0 C28 60 54 130 40 220" fill="none" stroke="' + INK + '" stroke-width="15" stroke-linecap="round"/>' +
    '<path d="M40 0 C28 60 54 130 40 220" fill="none" stroke="' + LEAF + '" stroke-width="8" stroke-linecap="round"/>' +
    leaf(40, 84, 50, 200, LEAF, 3.4) + leaf(44, 140, 48, -22, LEAF_D, 3.4);

  /* ---------- trời, mây, đồi ---------- */
  function sunRays(cx, cy, r1, r2, k) {
    var d = '';
    for (var i = 0; i < k; i++) {
      var a = i / k * Math.PI * 2, h = Math.PI / k * 0.55;
      d += 'M' + n(cx + Math.cos(a - h) * r1) + ' ' + n(cy + Math.sin(a - h) * r1) + 'Q' + n(cx + Math.cos(a) * r2 * 1.04) + ' ' + n(cy + Math.sin(a) * r2 * 1.04) + ' ' +
        n(cx + Math.cos(a + h) * r1) + ' ' + n(cy + Math.sin(a + h) * r1) + 'Z';
    }
    return '<path d="' + d + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
  }
  var sun = '<circle cx="130" cy="130" r="122" fill="#FFE9A8" opacity=".35"/>' + sunRays(130, 130, 68, 118, 12) +
    '<circle cx="130" cy="130" r="72" fill="' + YEL + '" stroke="' + INK + '" stroke-width="6"/>' + arc(130, 130, 56, 195, 250, WHITE, 8) +
    face(130, 128, 56);
  var cloudPuff = cloud(100, 58, 42, 5);
  function tree(x, y, r, col) {
    return '<rect x="' + n(x - r * 0.14) + '" y="' + n(y - r * 0.4) + '" width="' + n(r * 0.28) + '" height="' + n(r * 0.9) + '" rx="3" fill="' + WOOD + '" stroke="' + INK + '" stroke-width="4"/>' +
      '<circle cx="' + x + '" cy="' + n(y - r) + '" r="' + r + '" fill="' + col + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<circle cx="' + n(x - r * 0.35) + '" cy="' + n(y - r * 1.35) + '" r="' + n(r * 0.28) + '" fill="#fff" opacity=".35"/>';
  }
  var hills =
    '<path d="M-20 320 V170 Q180 90 380 150 Q560 200 760 120 Q980 40 1180 130 Q1320 180 1460 140 V320 Z" fill="#B9EBC9" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    tree(300, 150, 34, '#7CCB9A') + tree(360, 162, 24, '#5DBB8A') + tree(1010, 92, 40, '#5DBB8A') + tree(1080, 108, 28, '#7CCB9A') +
    '<path d="M-20 320 V236 Q240 172 520 222 Q800 272 1040 200 Q1260 150 1460 210 V320 Z" fill="#94DDB0" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    tree(640, 236, 30, '#5DBB8A') + tree(1300, 190, 32, '#7CCB9A');
  for (var hi = 0; hi < 22; hi++) hills += bloom(40 + hi * 66, 266 + (hi % 3) * 14, 7, 5, [PINK, WHITE, LILAC, PEACH][hi % 4], YEL, 1.6);

  /* thân hoa lớn hai bên (viewBox 0 0 360 900) */
  function bez(s, t) {
    var u = 1 - t;
    return [u * u * u * s[0][0] + 3 * u * u * t * s[1][0] + 3 * u * t * t * s[2][0] + t * t * t * s[3][0],
      u * u * u * s[0][1] + 3 * u * u * t * s[1][1] + 3 * u * t * t * s[2][1] + t * t * t * s[3][1]];
  }
  function leavesAlong(segs, list, len, sw, shade) {
    var o = '';
    list.forEach(function (q, i) {
      var s = segs[q[0]], p = bez(s, q[1]), p2 = bez(s, q[1] + 0.02), tx = p2[0] - p[0], ty = p2[1] - p[1], l = Math.hypot(tx, ty);
      tx /= l; ty /= l;
      var nx = -ty * q[2], ny = tx * q[2];
      o += leaf(p[0], p[1], len, deg(Math.atan2(ny * 5 - ty * 2, nx * 5 - tx * 2)), i % 2 ? shade[0] : shade[1], sw);
    });
    return o;
  }
  var BR_D = '#1D4A3C', BR = '#3E9468', BR_HI = '#7FD3A3';
  var brPaths = [
    ['M60 905 C36 760 150 700 112 580 C84 480 176 420 142 318 C118 248 164 190 130 116', 36],
    ['M104 660 C176 650 226 610 218 558 C212 518 168 518 170 550 C172 572 198 570 196 554', 24],
    ['M122 470 C60 470 18 438 24 398 C30 362 72 364 70 394 C68 412 48 410 50 398', 22],
    ['M140 332 C212 318 254 270 242 228 C232 194 192 198 196 226 C200 246 224 242 220 228', 22],
    ['M72 830 C154 840 236 806 256 744 C268 702 234 682 218 708', 24]
  ];
  var brSegs = [[[60, 905], [36, 760], [150, 700], [112, 580]], [[112, 580], [84, 480], [176, 420], [142, 318]], [[142, 318], [118, 248], [164, 190], [130, 116]]];
  var stem =
    brPaths.map(function (p) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR_D + '" stroke-width="' + (p[1] + 9) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    brPaths.map(function (p) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR + '" stroke-width="' + p[1] + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    brPaths.map(function (p, i) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR_HI + '" stroke-width="' + (i ? 3.5 : 5) + '" stroke-linecap="round" stroke-dasharray="' + (i ? '30 40' : '70 50') + '" transform="translate(-' + (i ? 4 : 7) + ' 0)" opacity=".85"/>'; }).join('') +
    leavesAlong(brSegs, [[0, 0.25, 1], [0, 0.5, -1], [0, 0.8, 1], [1, 0.2, -1], [1, 0.55, 1], [1, 0.85, -1], [2, 0.35, 1], [2, 0.7, -1]], 82, 5, [LEAF, LEAF_D]) +
    bloom(130, 100, 60, 6, WHITE, YEL, 5) + bloom(196, 550, 44, 5, PINK, YEL, 4.4) +
    bloom(50, 394, 38, 6, LILAC, YEL, 4) + bloom(220, 222, 36, 5, PEACH, YEL, 4) + bloom(218, 704, 42, 6, PINK_L, YEL, 4.4);

  /* thảm cỏ hoa phía dưới (viewBox 0 0 1440 200) */
  function hillRow(y, startX, step, rBase, rVar, fill, base) {
    var a = '', b = '', i = 0;
    for (var x = startX; x < 1540; x += step, i++) {
      var r = rBase + (i % 3) * rVar;
      a += '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 5) + '"/>';
      b += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    }
    if (base) { a += '<rect x="-80" y="' + (y - 5) + '" width="1600" height="120"/>'; b += '<rect x="-80" y="' + y + '" width="1600" height="120"/>'; }
    return '<g fill="' + INK + '">' + a + '</g><g fill="' + fill + '">' + b + '</g>';
  }
  var MC = [PINK, WHITE, LILAC, PEACH, PINK_L, SKY], backFl = '', frontFl = '';
  for (var bi = 0, bx = 40; bx < 1480; bx += 92, bi++) backFl += bloom(bx, 62 + (bi % 3) * 10, 9 + (bi % 2) * 2, 5, MC[(bi + 2) % MC.length], YEL, 2);
  for (var fi = 0, fx = 24; fx < 1480; fx += 66, fi++) frontFl += bloom(fx, 128 + (fi % 3) * 12 - (fi % 2) * 8, 12 + (fi % 3) * 3, fi % 4 === 1 ? 6 : 5, MC[fi % MC.length], YEL, 2.4);
  var meadow = hillRow(118, -60, 118, 62, 14, '#4FA67C', true) + backFl + hillRow(168, -10, 96, 50, 12, '#86D3A3', true) + frontFl;

  /* nấm nhà tiên (viewBox 0 -10 170 180) */
  var mushroom =
    '<path d="M58 96 Q50 140 56 158 Q85 168 114 158 Q120 140 112 96 Z" fill="#FFF1DC" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    face(85, 124, 26) +
    '<path d="M10 96 C10 40 50 6 85 6 C120 6 160 40 160 96 Q85 116 10 96 Z" fill="' + ROSE + '" stroke="' + INK + '" stroke-width="5.5" stroke-linejoin="round"/>' +
    '<path d="M28 70 C34 42 56 22 80 18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>' +
    [[52, 52, 10], [94, 34, 8], [128, 60, 11], [82, 76, 7], [30, 84, 6], [146, 88, 6]].map(function (d) { return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#fff" stroke="' + INK + '" stroke-width="3"/>'; }).join('') +
    leaf(52, 162, 30, -150, LEAF, 3) + leaf(118, 162, 30, -30, LEAF_D, 3) +
    bloom(24, 158, 14, 5, WHITE, YEL, 2.6) + bloom(148, 156, 13, 5, LILAC, YEL, 2.6);

  /* bó hoa góc phải (viewBox 0 0 240 220) */
  var bouquet =
    leaf(130, 110, 90, 200, LEAF_D, 4) + leaf(130, 110, 96, 150, LEAF, 4) + leaf(130, 110, 86, 100, LEAF_D, 4) +
    leaf(130, 110, 92, 40, LEAF, 4) + leaf(130, 110, 80, -20, LEAF_D, 4) + leaf(130, 110, 70, 250, LEAF, 4) +
    rose(104, 120, 36) + rose(162, 92, 30, PEACH, PEACH_D) + rose(150, 158, 28, PINK_L, ROSE) +
    bloom(70, 74, 24, 5, WHITE, YEL, 3) + bloom(196, 150, 20, 6, LILAC, YEL, 2.6) + bloom(92, 182, 17, 5, PINK, YEL, 2.4);

  /* ---------- đạo cụ các mục ---------- */
  /* cành cây treo bảng gỗ (viewBox 0 0 1000 120) */
  var BRANCH = 'M-20 46 C200 14 300 74 500 46 C700 18 820 66 1020 38';
  var branch =
    '<path d="' + BRANCH + '" fill="none" stroke="' + INK + '" stroke-width="24" stroke-linecap="round"/>' +
    '<path d="' + BRANCH + '" fill="none" stroke="' + WOOD + '" stroke-width="15" stroke-linecap="round"/>' +
    '<path d="M0 40 C200 10 300 68 500 40" fill="none" stroke="' + WOOD_L + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="36 22"/>' +
    leaf(80, 36, 54, -130, LEAF, 3.4) + leaf(110, 34, 50, 60, LEAF_D, 3.4) + leaf(300, 56, 56, -60, LEAF, 3.4) + leaf(330, 58, 50, 100, LEAF_D, 3.4) +
    leaf(640, 30, 54, -120, LEAF_D, 3.4) + leaf(680, 34, 48, 70, LEAF, 3.4) + leaf(900, 48, 56, -70, LEAF, 3.4) + leaf(930, 46, 46, 110, LEAF_D, 3.4) +
    bloom(96, 30, 26, 5, PINK, YEL, 3) + rose(316, 54, 20) + bloom(500, 40, 22, 6, WHITE, YEL, 3) + rose(660, 28, 18, PEACH, PEACH_D) + bloom(916, 44, 26, 5, LILAC, YEL, 3) +
    bfly(800, 14, 16, SKY, PINK);
  /* cổng hoa hình vòm (viewBox 0 0 800 440) */
  function garland() {
    var cx = 400, cy = 440, rx = 360, ry = 400, pts = [], d = '';
    for (var i = 0; i <= 48; i++) { var t = Math.PI + i / 48 * Math.PI; pts.push([cx + Math.cos(t) * rx, cy + Math.sin(t) * ry]); }
    d = 'M' + pts.map(function (p) { return n(p[0]) + ' ' + n(p[1]); }).join('L');
    var o = '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + LEAF_D + '" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>';
    var lv = '', fl = '', cols = [PINK, WHITE, LILAC, PEACH, PINK_L];
    for (var k = 1; k < 24; k++) {
      var tt = Math.PI + k / 24 * Math.PI, x = cx + Math.cos(tt) * rx, y = cy + Math.sin(tt) * ry;
      var nx = Math.cos(tt) * ry, ny = Math.sin(tt) * rx, out = Math.atan2(ny, nx);
      lv += leaf(x, y, 46, deg(out + (k % 2 ? 0.7 : -0.7)), k % 2 ? LEAF : LEAF_D, 3.4) + leaf(x, y, 34, deg(out + Math.PI + (k % 2 ? -0.6 : 0.6)), LEAF, 3);
      if (k % 3 === 0) fl += k % 6 === 0 ? rose(x, y, 22, k % 12 === 0 ? ROSE : PEACH, k % 12 === 0 ? ROSE_D : PEACH_D) : bloom(x, y, 26, 5, cols[(k / 3) % cols.length], YEL, 3);
    }
    return o + lv + fl + bloom(400, 40, 44, 6, WHITE, YEL, 4) + bfly(470, 70, 20, PINK, LILAC) +
      spark(330, 26, 10, YEL, 2.6) + spark(480, 14, 7, WHITE, 2);
  }

  var symbols = {
    petal: ['0 0 100 160', petal],
    budStem: ['0 0 400 300', budStem],
    petalRing: ['0 0 200 200', petalRing()],
    growStem: ['0 0 80 220', growStem],
    sun: ['0 0 260 260', sun],
    cloudPuff: ['0 0 200 100', cloudPuff],
    hills: ['0 0 1440 320', hills, 'xMidYMax slice'],
    stem: ['0 0 360 900', stem],
    meadow: ['0 0 1440 200', meadow, 'xMidYMax slice'],
    mushroom: ['0 -10 170 180', mushroom],
    bouquet: ['0 0 240 220', bouquet],
    branch: ['0 0 1000 120', branch],
    garland: ['0 0 800 440', garland()],
    butterflyArt: ['0 0 200 200', bfly(100, 104, 50, PINK, LILAC) + spark(36, 50, 8, YEL, 2.4) + spark(166, 150, 7, WHITE, 2.2)],
    bWing: ['0 0 50 100', bWing],
    bBody: ['0 0 20 100', bBody],
    spark: ['0 0 40 40', spark(20, 20, 17, YEL, 2.6)],
    flower: ['0 0 40 40', bloom(20, 20, 19, 5, WHITE, YEL, 2.2)],
    heart: ['0 0 40 40', '<path d="M20 34 C8 25 4 18 6 12 C8 6 16 5 20 12 C24 5 32 6 34 12 C36 18 32 25 20 34 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>']
  };
  var html = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs></defs>';
  Object.keys(symbols).forEach(function (k) {
    html += '<symbol id="' + k + '" viewBox="' + symbols[k][0] + '"' + (symbols[k][2] ? ' preserveAspectRatio="' + symbols[k][2] + '"' : '') + '>' + symbols[k][1] + '</symbol>';
  });
  html += '</svg>';
  var holder = document.createElement('div');
  holder.innerHTML = html;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);
})();
