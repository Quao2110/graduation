/* ===== Bộ hình SVG vườn thần tiên: thẻ bài hoa, bướm, trăng, bó hoa, đũa phép, sách, chậu hoa, hũ đom đóm, nấm ===== */
(function () {
  'use strict';
  var INK = '#3A1F4D', PURPLE = '#EE7FB2', PURPLE_D = '#D45F97', LAV_L = '#FFE3F0',
      CREAM = '#FFF6EA', YEL = '#FFC93C', PINK = '#FF8FCB', PINK_L = '#FFC6E4', WHITE = '#FFFFFF',
      LEAF = '#5DBB8A', LEAF_D = '#3E9468', LEAF_L = '#A8E6C1', ROSE = '#FF6F9F', ROSE_D = '#D94C80',
      PEACH = '#FFB38A', PEACH_D = '#E58A5C', LILAC = '#B79CFF', SKY = '#7FD6FF';
  var DEFS = [];
  function n(v) { return Math.round(v * 10) / 10; }
  function deg(a) { return n(a * 180 / Math.PI); }

  function spark(x, y, r, fill, sw, st) {
    fill = fill || WHITE; sw = sw == null ? 1.6 : sw;
    var k = r * 0.2;
    return '<path d="M' + n(x) + ' ' + n(y - r) + 'Q' + n(x + k) + ' ' + n(y - k) + ' ' + n(x + r) + ' ' + n(y) +
      'Q' + n(x + k) + ' ' + n(y + k) + ' ' + n(x) + ' ' + n(y + r) + 'Q' + n(x - k) + ' ' + n(y + k) + ' ' + n(x - r) + ' ' + n(y) +
      'Q' + n(x - k) + ' ' + n(y - k) + ' ' + n(x) + ' ' + n(y - r) + 'Z" fill="' + fill + '" stroke="' + (st || INK) + '" stroke-width="' + sw + '" stroke-linejoin="round"/>';
  }
  function diamond(x, y, w, h, fill, sw) {
    return '<path d="M' + x + ' ' + (y - h) + 'L' + (x + w) + ' ' + y + 'L' + x + ' ' + (y + h) + 'L' + (x - w) + ' ' + y + 'Z" fill="' + (fill || PEACH) +
      '" stroke="' + INK + '" stroke-width="' + (sw || 1.6) + '" stroke-linejoin="round"/>';
  }
  function starPts(cx, cy, k, R, r, rot) {
    rot = rot == null ? -Math.PI / 2 : rot;
    var p = [];
    for (var i = 0; i < k * 2; i++) {
      var rr = i % 2 ? r : R, a = rot + i * Math.PI / k;
      p.push(n(cx + Math.cos(a) * rr) + ',' + n(cy + Math.sin(a) * rr));
    }
    return p.join(' ');
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
    return '<g fill="' + INK + '">' + a + '</g><g fill="' + WHITE + '">' + b + '</g>';
  }
  /* trăng lưỡi liềm: vòng A bị khoét bởi vòng B */
  function crescent(id, cx, cy, R, bx, by, br, sw, fill) {
    var pad = sw + 2;
    DEFS.push('<mask id="' + id + 'm" maskUnits="userSpaceOnUse" x="' + n(cx - R - pad) + '" y="' + n(cy - R - pad) + '" width="' + n(2 * (R + pad)) + '" height="' + n(2 * (R + pad)) + '">' +
      '<rect x="' + n(cx - R - pad) + '" y="' + n(cy - R - pad) + '" width="' + n(2 * (R + pad)) + '" height="' + n(2 * (R + pad)) + '" fill="#fff"/>' +
      '<circle cx="' + bx + '" cy="' + by + '" r="' + br + '" fill="#000"/></mask>' +
      '<clipPath id="' + id + 'c"><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '"/></clipPath>');
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + (fill || YEL) + '" stroke="' + INK + '" stroke-width="' + sw + '" mask="url(#' + id + 'm)"/>' +
      '<circle cx="' + bx + '" cy="' + by + '" r="' + br + '" fill="none" stroke="' + INK + '" stroke-width="' + sw + '" clip-path="url(#' + id + 'c)"/>';
  }
  function arc(cx, cy, r, a1, a2, color, w) {
    var t1 = a1 * Math.PI / 180, t2 = a2 * Math.PI / 180;
    return '<path d="M' + n(cx + Math.cos(t1) * r) + ' ' + n(cy + Math.sin(t1) * r) + 'A' + r + ' ' + r + ' 0 0 1 ' + n(cx + Math.cos(t2) * r) + ' ' + n(cy + Math.sin(t2) * r) +
      '" fill="none" stroke="' + (color || WHITE) + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" opacity=".9"/>';
  }
  function face(cx, cy, s, happy) {
    var e = s * 0.24, out = '';
    if (happy) {
      out += '<path d="M' + n(cx - e - s * 0.12) + ' ' + n(cy) + 'Q' + n(cx - e) + ' ' + n(cy - s * 0.16) + ' ' + n(cx - e + s * 0.12) + ' ' + n(cy) +
        'M' + n(cx + e - s * 0.12) + ' ' + n(cy) + 'Q' + n(cx + e) + ' ' + n(cy - s * 0.16) + ' ' + n(cx + e + s * 0.12) + ' ' + n(cy) +
        '" fill="none" stroke="' + INK + '" stroke-width="' + n(s * 0.075) + '" stroke-linecap="round"/>';
      out += '<path d="M' + n(cx - s * 0.26) + ' ' + n(cy + s * 0.2) + 'Q' + n(cx) + ' ' + n(cy + s * 0.62) + ' ' + n(cx + s * 0.26) + ' ' + n(cy + s * 0.2) + 'Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="' + n(s * 0.05) + '" stroke-linejoin="round"/>';
      out += '<ellipse cx="' + cx + '" cy="' + n(cy + s * 0.4) + '" rx="' + n(s * 0.13) + '" ry="' + n(s * 0.07) + '" fill="' + PINK + '"/>';
    } else {
      out += '<ellipse cx="' + n(cx - e) + '" cy="' + cy + '" rx="' + n(s * 0.07) + '" ry="' + n(s * 0.1) + '" fill="' + INK + '"/>' +
        '<ellipse cx="' + n(cx + e) + '" cy="' + cy + '" rx="' + n(s * 0.07) + '" ry="' + n(s * 0.1) + '" fill="' + INK + '"/>';
      out += '<path d="M' + n(cx - s * 0.2) + ' ' + n(cy + s * 0.24) + 'Q' + cx + ' ' + n(cy + s * 0.44) + ' ' + n(cx + s * 0.2) + ' ' + n(cy + s * 0.24) +
        '" fill="none" stroke="' + INK + '" stroke-width="' + n(s * 0.075) + '" stroke-linecap="round"/>';
    }
    out += '<circle cx="' + n(cx - s * 0.45) + '" cy="' + n(cy + s * 0.22) + '" r="' + n(s * 0.13) + '" fill="' + PINK + '" opacity=".85"/>' +
      '<circle cx="' + n(cx + s * 0.45) + '" cy="' + n(cy + s * 0.22) + '" r="' + n(s * 0.13) + '" fill="' + PINK + '" opacity=".85"/>';
    return out;
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

  /* ---------- khung thẻ (viewBox 0 0 200 330) ---------- */
  var FRAME = 'M44 40 H80 C88 40 92 36 100 29 C108 36 112 40 120 40 H156 A12 12 0 0 0 168 52 V272 A12 12 0 0 0 156 284 H120 C112 284 108 288 100 295 C92 288 88 284 80 284 H44 A12 12 0 0 0 32 272 V52 A12 12 0 0 0 44 40 Z';
  var RIBBON = '<path d="M32 256 H13 L20 268 L13 280 H32 Z" fill="' + LEAF + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M168 256 H187 L180 268 L187 280 H168 Z" fill="' + LEAF + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<rect x="26" y="250" width="148" height="34" rx="10" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="3.5"/>';
  function base(panel, ribbon) {
    return '<rect x="6" y="12" width="188" height="316" rx="24" fill="' + INK + '"/>' +
      '<rect x="6" y="4" width="188" height="316" rx="24" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="14" y="12" width="172" height="300" rx="17" fill="none" stroke="' + LAV_L + '" stroke-width="1.6" opacity=".7"/>' +
      bloom(18.5, 18.5, 9, 5, WHITE, YEL, 1.4) + bloom(181.5, 18.5, 9, 5, WHITE, YEL, 1.4) + bloom(18.5, 305.5, 9, 5, WHITE, YEL, 1.4) + bloom(181.5, 305.5, 9, 5, WHITE, YEL, 1.4) +
      '<rect x="24" y="26" width="152" height="272" rx="12" fill="' + panel + '" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<path d="' + FRAME + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="' + FRAME + '" fill="none" stroke="' + WHITE + '" stroke-width="3" stroke-linejoin="round"/>' +
      (ribbon ? RIBBON : '');
  }

  var butterflyArt = cloud(56, 70, 9) + cloud(150, 64, 8) +
    bfly(100, 132, 44, PINK, LILAC) +
    '<path d="M40 244 Q62 200 100 214 Q136 198 160 244 Z" fill="' + LEAF + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M58 222 Q72 210 88 212" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>' +
    leaf(70, 222, 20, -125) + leaf(132, 224, 20, -55) +
    bloom(70, 214, 13, 5, PINK_L) + bloom(100, 204, 15, 6, WHITE) + bloom(132, 216, 12, 5, LILAC) +
    spark(50, 104, 6) + spark(152, 102, 6.5, YEL) + spark(46, 164, 4.4) + spark(158, 170, 4.4, PINK) + spark(100, 62, 5.5, YEL) +
    diamond(72, 50, 3, 5.5) + diamond(130, 46, 3, 5.5, PINK);

  /* sticker nhỏ cho khung ảnh (viewBox 0 0 60 60) */
  var stickerFlower = bloom(30, 30, 27, 5, PINK, YEL, 3) + face(30, 29, 9, true);
  var stickerButterfly = bfly(30, 32, 21, SKY, PINK);

  /* ---------- đạo cụ trang chủ ---------- */
  var moonBig = crescent('mb', 112, 128, 80, 150, 100, 66, 7, '#FFE9A8') + arc(112, 128, 64, 150, 215, WHITE, 8) +
    bloom(214, 44, 18, 5, PINK, YEL, 3) + bloom(236, 150, 13, 5, WHITE, YEL, 2.6) + bloom(150, 236, 12, 5, LILAC, YEL, 2.6) + spark(30, 30, 10, YEL, 3);
  /* bó hoa góc phải (viewBox 0 0 240 220) */
  var bouquet =
    leaf(130, 110, 90, 200, LEAF_D, 4) + leaf(130, 110, 96, 150, LEAF, 4) + leaf(130, 110, 86, 100, LEAF_D, 4) +
    leaf(130, 110, 92, 40, LEAF, 4) + leaf(130, 110, 80, -20, LEAF_D, 4) + leaf(130, 110, 70, 250, LEAF, 4) +
    rose(104, 120, 36) + rose(162, 92, 30, PEACH, PEACH_D) + rose(150, 158, 28, PINK_L, ROSE) +
    bloom(70, 74, 24, 5, WHITE, YEL, 3) + bloom(196, 150, 20, 6, LILAC, YEL, 2.6) + bloom(92, 182, 17, 5, PINK, YEL, 2.4) +
    spark(206, 52, 9, YEL, 2.6) + spark(40, 140, 7, WHITE, 2.2) + spark(120, 44, 6, PINK, 2);
  /* đũa phép kết hoa (viewBox 0 0 262 120) */
  var wand =
    '<line x1="22" y1="108" x2="196" y2="36" stroke="' + INK + '" stroke-width="15" stroke-linecap="round"/>' +
    '<line x1="22" y1="108" x2="196" y2="36" stroke="#FFE597" stroke-width="8" stroke-linecap="round"/>' +
    '<line x1="40" y1="96" x2="170" y2="42" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>' +
    '<path d="M150 56 C140 74 150 92 136 104 M150 56 C166 72 160 92 176 100" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/>' +
    '<path d="M150 56 C140 74 150 92 136 104 M150 56 C166 72 160 92 176 100" fill="none" stroke="' + PINK + '" stroke-width="4.5" stroke-linecap="round"/>' +
    leaf(150, 56, 26, 160, LEAF, 2.6) + leaf(150, 56, 24, 60, LEAF_D, 2.6) + rose(150, 56, 12) +
    '<polygon points="' + starPts(214, 28, 5, 28, 13) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round"/>' +
    '<ellipse cx="207" cy="20" rx="3" ry="6" fill="#fff" opacity=".85" transform="rotate(-30 207 20)"/>' +
    spark(246, 60, 7, WHITE, 2) + spark(182, 8, 6, PINK, 2) + spark(252, 14, 4, WHITE, 1.6);

  /* ---------- mặt sau thẻ: xanh rêu + vàng, đóa hoa 16 cánh, mũ cử nhân ---------- */
  var GOLD = '#F5C451', GOLD_L = '#FFE597', GOLD_D = '#D9962B', MOSS = '#1C4D42', MOSS_L = '#24675A';
  function moonRowGold(y) {
    var r = 4.2, xs = [70, 85, 100, 115, 130], ring = function (x) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + GOLD + '" stroke-width="1.6"/>'; };
    return ring(xs[0]) + ring(xs[1]) + '<path d="M' + xs[1] + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 1 ' + xs[1] + ' ' + (y + r) + 'Z" fill="' + GOLD + '"/>' +
      '<circle cx="100" cy="' + y + '" r="' + (r + 0.8) + '" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="1.2"/>' +
      ring(xs[3]) + '<path d="M' + xs[3] + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 0 ' + xs[3] + ' ' + (y + r) + 'Z" fill="' + GOLD + '"/>' + ring(xs[4]);
  }
  function goldBloom(cx, cy) {
    var small = '', big = '';
    for (var k = 0; k < 16; k++) {
      var isBig = k % 2 === 0, a = -Math.PI / 2 + k * Math.PI / 8, L = isBig ? 34 : 25, w = isBig ? 9 : 6.5;
      var px = cx + Math.cos(a) * L / 2, py = cy + Math.sin(a) * L / 2;
      var e = '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="' + n(L / 2) + '" ry="' + w + '" transform="rotate(' + deg(a) + ' ' + n(px) + ' ' + n(py) + ')" fill="' + (isBig ? GOLD_L : GOLD_D) + '" stroke="' + INK + '" stroke-width="2"/>';
      if (isBig) big += e; else small += e;
    }
    return small + big;
  }
  function mortar(cx, cy) {
    return '<path d="M' + (cx - 6) + ' ' + (cy + 1) + 'V' + (cy + 5) + 'Q' + cx + ' ' + (cy + 8.5) + ' ' + (cx + 6) + ' ' + (cy + 5) + 'V' + (cy + 1) + 'Z" fill="' + GOLD_D + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>' +
      '<path d="M' + cx + ' ' + (cy - 7) + 'L' + (cx + 10) + ' ' + (cy - 2) + 'L' + cx + ' ' + (cy + 3) + 'L' + (cx - 10) + ' ' + (cy - 2) + 'Z" fill="' + GOLD_L + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>' +
      '<path d="M' + cx + ' ' + (cy - 2) + 'L' + (cx + 7) + ' ' + (cy + 0.5) + 'V' + (cy + 6) + '" fill="none" stroke="' + GOLD + '" stroke-width="1.1" stroke-linecap="round"/>' +
      '<circle cx="' + (cx + 7) + '" cy="' + (cy + 6.8) + '" r="1.3" fill="' + GOLD + '"/>';
  }
  function luxBack() {
    var rr = seeded(11), dots = '', tick = '';
    for (var i = 0; i < 40; i++) dots += '<circle cx="' + n(36 + rr() * 128) + '" cy="' + n(46 + rr() * 238) + '" r="' + n(0.5 + rr() * 0.9) + '" fill="' + GOLD + '" opacity="' + n(0.2 + rr() * 0.45) + '"/>';
    for (var t = 0; t < 32; t++) {
      var ta = t / 32 * Math.PI * 2, r1 = t % 4 ? 39.5 : 36.5;
      tick += 'M' + n(100 + Math.cos(ta) * r1) + ' ' + n(160 + Math.sin(ta) * r1) + 'L' + n(100 + Math.cos(ta) * 43) + ' ' + n(160 + Math.sin(ta) * 43);
    }
    var ring = '';
    for (var j = 0; j < 12; j++) {
      var a = j / 12 * Math.PI * 2;
      ring += leaf(100 + Math.cos(a) * 49, 160 + Math.sin(a) * 49, 18, deg(a + Math.PI / 2), j % 2 ? GOLD_D : GOLD, 1.6);
    }
    return '<rect x="6" y="12" width="188" height="316" rx="24" fill="' + INK + '"/>' +
      '<rect x="6" y="4" width="188" height="316" rx="24" fill="' + MOSS_L + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="14" y="12" width="172" height="300" rx="17" fill="none" stroke="' + GOLD + '" stroke-width="1.6" opacity=".85"/>' +
      spark(18.5, 18.5, 4.5, GOLD) + spark(181.5, 18.5, 4.5, GOLD) + spark(18.5, 305.5, 4.5, GOLD) + spark(181.5, 305.5, 4.5, GOLD) +
      '<rect x="24" y="26" width="152" height="272" rx="12" fill="' + MOSS + '" stroke="' + INK + '" stroke-width="3.5"/>' + dots +
      '<path d="' + FRAME + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="' + FRAME + '" fill="none" stroke="' + GOLD + '" stroke-width="3" stroke-linejoin="round"/>' +
      diamond(100, 31, 4.5, 6.5, GOLD_L, 1.6) + diamond(100, 293, 4.5, 6.5, GOLD_L, 1.6) +
      ring +
      '<circle cx="100" cy="160" r="45" fill="' + MOSS_L + '" stroke="' + INK + '" stroke-width="9"/>' +
      '<circle cx="100" cy="160" r="45" fill="none" stroke="' + GOLD + '" stroke-width="4"/>' +
      '<path d="' + tick + '" stroke="' + GOLD + '" stroke-width="1.6" stroke-linecap="round"/>' +
      goldBloom(100, 160) +
      '<circle cx="100" cy="160" r="12.5" fill="' + MOSS + '" stroke="' + INK + '" stroke-width="3"/>' +
      '<circle cx="100" cy="160" r="12.5" fill="none" stroke="' + GOLD + '" stroke-width="1.6"/>' + mortar(100, 160) +
      moonRowGold(62) + moonRowGold(258) +
      bfly(52, 98, 9, GOLD_L, GOLD) + bfly(148, 222, 9, GOLD_L, GOLD) + spark(148, 96, 5, GOLD) + spark(52, 224, 5, GOLD) +
      spark(100, 84, 3.4, GOLD_L, 1.2) + spark(100, 236, 3.4, GOLD_L, 1.2);
  }

  /* ---------- họa tiết chìm trên trang sách ---------- */
  var WM = '#E3B9C9', WMF = '#FBEBEF';
  function wmBloom(x, y, r) {
    var o = '';
    for (var i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + i * Math.PI * 2 / 5, px = x + Math.cos(a) * r * 0.55, py = y + Math.sin(a) * r * 0.55;
      o += '<ellipse cx="' + n(px) + '" cy="' + n(py) + '" rx="' + n(r * 0.52) + '" ry="' + n(r * 0.34) + '" transform="rotate(' + deg(a) + ' ' + n(px) + ' ' + n(py) + ')" fill="' + WMF + '" stroke="' + WM + '" stroke-width="2.5"/>';
    }
    return o + '<circle cx="' + x + '" cy="' + y + '" r="' + n(r * 0.28) + '" fill="' + WM + '"/>';
  }
  function wmSpark(x, y, r) { return spark(x, y, r, WMF, 2.5, WM); }
  function wmStem(x, y, h, r) {
    return '<path d="M' + x + ' ' + y + 'Q' + (x - 8) + ' ' + n(y - h / 2) + ' ' + x + ' ' + (y - h) + '" fill="none" stroke="' + WM + '" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M' + (x - 2) + ' ' + n(y - h * 0.4) + 'q-18 -4 -22 -16 q16 -2 22 16Z" fill="' + WMF + '" stroke="' + WM + '" stroke-width="2.4" stroke-linejoin="round"/>' + wmBloom(x, y - h, r);
  }
  function wmBanner(cx, y, w) {
    var h = 24, x0 = cx - w / 2, x1 = cx + w / 2, sty = '" fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round"/>';
    return '<path d="M' + (x0 - 24) + ' ' + (y + 7) + 'H' + (x0 + 4) + 'V' + (y + h + 7) + 'H' + (x0 - 24) + 'L' + (x0 - 13) + ' ' + (y + h / 2 + 7) + 'Z' + sty +
      '<path d="M' + (x1 + 24) + ' ' + (y + 7) + 'H' + (x1 - 4) + 'V' + (y + h + 7) + 'H' + (x1 + 24) + 'L' + (x1 + 13) + ' ' + (y + h / 2 + 7) + 'Z' + sty +
      '<rect x="' + x0 + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4' + sty +
      '<path d="M' + (x0 + 16) + ' ' + (y + h / 2) + 'H' + (x1 - 16) + '" stroke="' + WM + '" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round"/>';
  }
  function wmHang(x, y0, y1, r) { return '<path d="M' + x + ' ' + y0 + 'V' + (y1 - r) + '" stroke="' + WM + '" stroke-width="2"/>' + wmBloom(x, y1, r * 1.5); }
  function wmRow(x0, x1, y) {
    var o = '<path d="M' + x0 + ' ' + y + 'H' + x1 + '" stroke="' + WM + '" stroke-width="2.5" stroke-linecap="round"/>', i = 0;
    for (var x = x0 + 24; x < x1 - 14; x += 42, i++) {
      var k = i % 4;
      if (k === 0) o += wmBloom(x, y, 14);
      else if (k === 2) o += wmSpark(x, y, 8);
      else o += '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="' + WM + '"/>';
    }
    return o;
  }
  function wmButterfly(x, y, s) {
    return '<g fill="' + WMF + '" stroke="' + WM + '" stroke-width="2.6">' +
      '<ellipse cx="' + (x - s * 0.55) + '" cy="' + (y - s * 0.28) + '" rx="' + n(s * 0.58) + '" ry="' + n(s * 0.42) + '" transform="rotate(28 ' + (x - s * 0.55) + ' ' + (y - s * 0.28) + ')"/>' +
      '<ellipse cx="' + (x + s * 0.55) + '" cy="' + (y - s * 0.28) + '" rx="' + n(s * 0.58) + '" ry="' + n(s * 0.42) + '" transform="rotate(-28 ' + (x + s * 0.55) + ' ' + (y - s * 0.28) + ')"/>' +
      '<ellipse cx="' + (x - s * 0.4) + '" cy="' + (y + s * 0.38) + '" rx="' + n(s * 0.36) + '" ry="' + n(s * 0.3) + '"/><ellipse cx="' + (x + s * 0.4) + '" cy="' + (y + s * 0.38) + '" rx="' + n(s * 0.36) + '" ry="' + n(s * 0.3) + '"/></g>' +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="3" ry="' + n(s * 0.5) + '" fill="' + WM + '"/>';
  }
  var wmLeft =
    wmBanner(272, 74, 150) + wmHang(222, 105, 136, 8) + wmHang(320, 105, 128, 6.5) +
    '<path d="M60 318 Q150 280 240 304 Q330 328 480 294" fill="none" stroke="' + WM + '" stroke-width="3"/>' +
    wmStem(98, 312, 70, 18) + wmStem(140, 302, 50, 13) + wmStem(438, 300, 62, 16) + wmStem(466, 296, 42, 11) +
    wmButterfly(280, 220, 30) + wmButterfly(170, 190, 16) +
    wmSpark(392, 160, 7) + wmSpark(118, 150, 6) + wmRow(84, 470, 342);
  var wmRight =
    wmBanner(728, 74, 150) + wmHang(682, 105, 132, 6.5) + wmHang(776, 105, 138, 8) +
    '<path d="M520 300 Q610 268 700 290 Q800 312 940 280" fill="none" stroke="' + WM + '" stroke-width="3"/>' +
    '<g fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round">' +
    '<path d="M666 292 V250 Q666 214 700 196 Q690 180 717 172 Q744 180 734 196 Q768 214 768 250 V292 Z"/>' +
    '<path d="M640 252 C640 200 690 170 717 170 C744 170 794 200 794 252 Q717 268 640 252 Z"/></g>' +
    '<circle cx="684" cy="226" r="7" fill="' + WM + '"/><circle cx="742" cy="214" r="9" fill="' + WM + '"/><circle cx="716" cy="196" r="5" fill="' + WM + '"/>' +
    '<path d="M707 292 V272 A10 10 0 0 1 727 272 V292" fill="none" stroke="' + WM + '" stroke-width="3"/>' +
    '<path d="M852 126 A24 24 0 1 0 876 160 A19 19 0 1 1 852 126 Z" fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round"/>' +
    wmStem(580, 290, 56, 15) + wmStem(882, 282, 64, 17) + wmButterfly(612, 168, 18) +
    wmSpark(806, 126, 8) + wmSpark(900, 206, 6) + wmSpark(628, 236, 5) + wmRow(530, 916, 342);

  /* sách mở (viewBox 0 0 1000 430) */
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  DEFS.push('<linearGradient id="spineShade" x1="400" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="' + INK + '" stop-opacity="0"/><stop offset=".5" stop-color="' + INK + '" stop-opacity=".22"/><stop offset="1" stop-color="' + INK + '" stop-opacity="0"/></linearGradient>');
  var book =
    '<path d="M30 76 Q260 34 500 74 Q740 34 970 76 L992 392 Q750 360 500 410 Q250 360 8 392 Z" fill="' + LEAF_D + '" stroke="' + INK + '" stroke-width="8" stroke-linejoin="round"/>' +
    '<path d="M44 78 Q260 40 500 76 L500 398 Q260 352 36 380 Z" fill="#F3D9C2" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" transform="translate(0 12)"/>' +
    '<path d="M956 78 Q740 40 500 76 L500 398 Q740 352 964 380 Z" fill="#F3D9C2" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" transform="translate(0 12)"/>' +
    '<path d="M50 70 Q260 30 500 66 L500 388 Q260 344 42 372 Z" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
    '<path d="M950 70 Q740 30 500 66 L500 388 Q740 344 958 372 Z" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
    '<g opacity=".9">' + wmLeft + wmRight + '</g>' +
    '<rect x="400" y="60" width="200" height="330" fill="url(#spineShade)"/>' +
    '<path d="M500 66 V388" stroke="' + INK + '" stroke-width="5"/>' +
    '<path d="M486 392 V428 L500 418 L514 428 V392 Z" fill="' + ROSE + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    leaf(30, 380, 60, 160, LEAF, 4) + leaf(40, 384, 52, 120, LEAF_D, 4) + rose(28, 372, 22) + bloom(64, 396, 16, 5, WHITE, YEL, 2.6) +
    leaf(970, 380, 60, 20, LEAF, 4) + leaf(960, 384, 52, 60, LEAF_D, 4) + rose(972, 372, 22, PEACH, PEACH_D) + bloom(936, 396, 16, 5, LILAC, YEL, 2.6);

  /* chậu hoa (viewBox 0 0 90 108) */
  var pot =
    '<path d="M45 70 C44 56 46 44 45 34" stroke="' + INK + '" stroke-width="6" stroke-linecap="round" fill="none"/>' +
    '<path d="M45 70 C44 56 46 44 45 34" stroke="' + LEAF + '" stroke-width="3" stroke-linecap="round" fill="none"/>' +
    leaf(45, 62, 24, -150, LEAF, 2.4) + leaf(45, 54, 22, -30, LEAF_D, 2.4) +
    bloom(45, 28, 26, 6, PINK, YEL, 3) +
    '<path d="M18 70 H72 L66 102 Q65 106 60 106 H30 Q25 106 24 102 Z" fill="#F08F6E" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<rect x="14" y="64" width="62" height="13" rx="5" fill="#F7A585" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M32 88 Q45 95 58 88" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>';
  /* hũ đom đóm (viewBox 0 0 110 108) */
  var glowDot = function (x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 2) + '" fill="#FFF3A0" opacity=".35"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FFF7C2"/>'; };
  var jar =
    '<path d="M34 22 H76 Q92 34 92 60 V88 Q92 104 76 104 H34 Q18 104 18 88 V60 Q18 34 34 22 Z" fill="#DFF7EC" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round"/>' +
    glowDot(40, 62, 5) + glowDot(64, 50, 4) + glowDot(70, 82, 6) + glowDot(46, 88, 3.5) + glowDot(58, 70, 3) +
    '<ellipse cx="30" cy="58" rx="4" ry="14" fill="#fff" opacity=".85"/>' +
    '<rect x="30" y="8" width="50" height="16" rx="4" fill="#C98B4A" stroke="' + INK + '" stroke-width="3.5"/>' +
    '<path d="M30 18 Q55 26 80 18" fill="none" stroke="' + PINK + '" stroke-width="4" stroke-linecap="round"/>' +
    leaf(24, 102, 30, -110, LEAF, 2.6) + leaf(22, 104, 26, -160, LEAF_D, 2.6) + bloom(88, 100, 13, 5, LILAC, YEL, 2.2);

  function bez(s, t) {
    var u = 1 - t;
    return [u * u * u * s[0][0] + 3 * u * u * t * s[1][0] + 3 * u * t * t * s[2][0] + t * t * t * s[3][0],
      u * u * u * s[0][1] + 3 * u * u * t * s[1][1] + 3 * u * t * t * s[2][1] + t * t * t * s[3][1]];
  }
  /* lá mọc dọc theo nhánh: segs là các đoạn bezier, q = [đoạn, t, phía] */
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

  /* dây leo nở hoa (viewBox 0 0 220 440) */
  var VINE = LEAF_D, VINE_HI = '#8FE0B2';
  var stemSegs = [[[160, 440], [120, 380], [178, 330], [150, 270]], [[150, 270], [124, 214], [178, 170], [146, 112]], [[146, 112], [126, 76], [140, 44], [120, 20]]];
  var vinePaths = ['M160 440 C120 380 178 330 150 270 C124 214 178 170 146 112 C126 76 140 44 120 20',
    'M146 300 C104 304 70 284 72 254 C74 228 104 222 114 240 C122 256 104 266 96 256',
    'M160 196 C196 184 214 156 204 128 C196 104 168 104 166 124 C164 140 182 144 186 132',
    'M138 96 C104 96 84 74 92 52 C100 32 126 36 124 54 C122 66 108 64 110 56',
    'M144 392 C172 398 192 382 188 362 C184 344 162 346 166 362'];
  var vine =
    vinePaths.map(function (d, i) { return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (i ? 13 : 17) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    vinePaths.map(function (d, i) { return '<path d="' + d + '" fill="none" stroke="' + VINE + '" stroke-width="' + (i ? 7 : 10) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    '<path d="' + vinePaths[0] + '" fill="none" stroke="' + VINE_HI + '" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="40 26" opacity=".9"/>' +
    leavesAlong(stemSegs, [[0, 0.35, 1], [0, 0.72, -1], [1, 0.3, 1], [1, 0.68, -1], [2, 0.45, 1]], 32, 2.8, [LEAF, '#4FAE7E']) +
    bloom(96, 254, 19, 5, PINK, YEL, 2.6) + rose(186, 130, 17) + bloom(110, 54, 16, 6, WHITE, YEL, 2.4) +
    bloom(166, 360, 17, 5, LILAC, YEL, 2.4) + rose(120, 18, 15, PEACH, PEACH_D) +
    spark(84, 160, 7, YEL, 2.2) + spark(196, 236, 5, WHITE, 2) + spark(60, 30, 5, PINK, 2);

  /* thân hoa lớn phía sau (viewBox 0 0 360 900) */
  var BR_D = '#1D4A3C', BR = '#2F7A5E', BR_HI = '#6CC796';
  var brPaths = [
    ['M60 905 C36 760 150 700 112 580 C84 480 176 420 142 318 C118 248 164 190 130 116', 36],
    ['M104 660 C176 650 226 610 218 558 C212 518 168 518 170 550 C172 572 198 570 196 554', 24],
    ['M122 470 C60 470 18 438 24 398 C30 362 72 364 70 394 C68 412 48 410 50 398', 22],
    ['M140 332 C212 318 254 270 242 228 C232 194 192 198 196 226 C200 246 224 242 220 228', 22],
    ['M132 166 C88 156 66 114 84 86 C98 64 130 76 124 98', 18],
    ['M72 830 C154 840 236 806 256 744 C268 702 234 682 218 708', 24],
    ['M96 760 C40 750 6 716 14 680 C22 650 56 656 52 680', 18]
  ];
  var brSegs = [[[60, 905], [36, 760], [150, 700], [112, 580]], [[112, 580], [84, 480], [176, 420], [142, 318]], [[142, 318], [118, 248], [164, 190], [130, 116]]];
  var stem =
    brPaths.map(function (p) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR_D + '" stroke-width="' + (p[1] + 9) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    brPaths.map(function (p) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR + '" stroke-width="' + p[1] + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    brPaths.map(function (p, i) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR_HI + '" stroke-width="' + (i ? 3.5 : 5) + '" stroke-linecap="round" stroke-dasharray="' + (i ? '30 40' : '70 50') + '" transform="translate(-' + (i ? 4 : 7) + ' 0)" opacity=".85"/>'; }).join('') +
    leavesAlong(brSegs, [[0, 0.25, 1], [0, 0.5, -1], [0, 0.8, 1], [1, 0.2, -1], [1, 0.55, 1], [1, 0.85, -1], [2, 0.35, 1], [2, 0.7, -1]], 82, 5, [BR, '#3E9468']) +
    rose(130, 104, 42) + bloom(84, 84, 30, 5, WHITE, YEL, 3.6) + bloom(196, 550, 46, 6, '#FFD1E6', YEL, 4.4) +
    bloom(50, 394, 40, 5, LILAC, YEL, 4) + rose(220, 222, 36, PEACH, PEACH_D) + bloom(218, 704, 42, 6, PINK, YEL, 4.4) + rose(52, 676, 32, PINK_L, ROSE);

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
  var meadow = hillRow(118, -60, 118, 62, 14, '#4FA67C', true) + backFl + hillRow(168, -10, 96, 50, 12, '#86D3A3', true) + frontFl +
    spark(300, 100, 9, YEL, 2.4) + spark(1150, 92, 8, WHITE, 2.2) + spark(760, 140, 6, PINK, 2);

  /* nấm nhà tiên (viewBox 0 -10 170 180) */
  var mushroom =
    '<path d="M58 96 Q50 140 56 158 Q85 168 114 158 Q120 140 112 96 Z" fill="#FFF1DC" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    face(85, 124, 26, true) +
    '<path d="M10 96 C10 40 50 6 85 6 C120 6 160 40 160 96 Q85 116 10 96 Z" fill="' + ROSE + '" stroke="' + INK + '" stroke-width="5.5" stroke-linejoin="round"/>' +
    '<path d="M28 70 C34 42 56 22 80 18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>' +
    [[52, 52, 10], [94, 34, 8], [128, 60, 11], [82, 76, 7], [30, 84, 6], [146, 88, 6]].map(function (d) { return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#fff" stroke="' + INK + '" stroke-width="3"/>'; }).join('') +
    leaf(52, 162, 30, -150, LEAF, 3) + leaf(118, 162, 30, -30, LEAF_D, 3) + leaf(60, 166, 24, -110, LEAF_D, 3) +
    bloom(24, 158, 14, 5, WHITE, YEL, 2.6) + bloom(148, 156, 13, 5, LILAC, YEL, 2.6);

  var symbols = {
    stem: ['0 0 360 900', stem],
    meadow: ['0 0 1440 200', meadow, 'xMidYMax slice'],
    mushroom: ['0 -10 170 180', mushroom],
    vine: ['0 0 220 440', vine],
    cardBack: ['0 0 200 330', luxBack()],
    cardButterfly: ['0 0 200 330', base(CREAM, true) + butterflyArt],
    cardPhoto: ['0 0 200 330', base(CREAM, true)],
    stickerFlower: ['0 0 60 60', stickerFlower],
    stickerButterfly: ['0 0 60 60', stickerButterfly],
    moonBig: ['0 0 260 260', moonBig],
    bouquet: ['0 0 240 220', bouquet],
    wand: ['0 0 262 120', wand],
    book: ['0 0 1000 432', book],
    pot: ['0 0 90 108', pot],
    jar: ['0 0 110 108', jar],
    bWing: ['0 0 50 100', bWing],
    bBody: ['0 0 20 100', bBody],
    spark: ['0 0 40 40', spark(20, 20, 17, YEL, 2.6)],
    sparkW: ['0 0 40 40', spark(20, 20, 17, WHITE, 2.6)],
    flower: ['0 0 40 40', bloom(20, 20, 19, 5, WHITE, YEL, 2.2)],
    heart: ['0 0 40 40', '<path d="M20 34 C8 25 4 18 6 12 C8 6 16 5 20 12 C24 5 32 6 34 12 C36 18 32 25 20 34 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>']
  };
  var html = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>';
  var body = '';
  Object.keys(symbols).forEach(function (k) {
    body += '<symbol id="' + k + '" viewBox="' + symbols[k][0] + '"' + (symbols[k][2] ? ' preserveAspectRatio="' + symbols[k][2] + '"' : '') + '>' + symbols[k][1] + '</symbol>';
  });
  html += DEFS.join('') + '</defs>' + body + '</svg>';
  var holder = document.createElement('div');
  holder.innerHTML = html;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);
})();
