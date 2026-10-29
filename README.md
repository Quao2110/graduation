# Thư Mời Tốt Nghiệp · Trương Thị Thanh Huyền

Thư mời dự lễ tốt nghiệp online dạng **hành trình dạo rừng xanh sương mờ 2.5D** (cảm hứng màu sắc từ game Hoa): cuộn chuột hoặc vuốt như bình thường, cảnh trôi sang ngang như một game cuộn cảnh, có cáo con đi cùng.

Kỹ thuật hạt sáng và xếp tên bằng canvas tham khảo từ [TranMinh0903/Invitation-card](https://github.com/TranMinh0903/Invitation-card); thiết kế, bố cục, hình minh họa và nội dung làm mới.

## Sáu chặng

| # | Chặng | Nội dung |
|---|-------|----------|
| 1 | Ngày hội tốt nghiệp | Ảnh chân dung trong vòng nguyệt quế, tên tụ lại từ đom đóm và bướm, huy hiệu 4 năm · 1 tấm bằng · ∞ kỷ niệm |
| 2 | Cây ước nguyện | Thư cảm ơn treo trên cây, ảnh tân cử nhân, ba mẩu giấy biết ơn |
| 3 | Ba chiếc khinh khí cầu | Ngày ấy · Hôm nay · Mai sau |
| 4 | Hồ kỷ niệm | Mười ảnh đứng trên lá sen, có chú thích |
| 5 | Cổng hoa | Thư mời, đếm ngày, chỉ đường, lưu vào lịch (.ics) |
| 6 | Hẹn gặp bạn | Ảnh cùng mọi người, mũ cử nhân tung lên, pháo đom đóm |

Điều hướng: cuộn/vuốt, thanh chặng ở dưới, hoặc phím ← →. Tôn trọng `prefers-reduced-motion`.

HTML, CSS, JavaScript thuần, không cần build. Toàn bộ hình vẽ là SVG sinh từ code (`js/sprite.js`), cảnh nền là các ô SVG lặp liền mạch.

## Cần điền trước khi gửi

| Nội dung | Ở đâu |
|----------|-------|
| Ngày, giờ, nơi (đã điền: 07.11.2026, 12h30, ĐH FPT TP.HCM) | `index.html`, danh sách `facts` |
| Giờ lễ (đếm ngày, file lịch), tên địa điểm cho lịch | `js/main.js`, đối tượng `EVENT` ở đầu file |
| Chú thích ảnh ở Hồ kỷ niệm | `index.html`, các thẻ `figcaption` trong `.pads` |

## Thêm ảnh

Đặt ảnh vào `assets/images/` rồi thêm `data-src` cho khung tương ứng trong `index.html`, ví dụ:

```html
<label class="photo-slot wreath-photo" data-slot="chan-dung" data-src="assets/images/chan-dung.jpg" data-label="Ảnh chân dung"></label>
```

Các khung: `chan-dung`, `tan-cu-nhan`, `thoi-sinh-vien`, `ao-cu-nhan`, `album-1` … `album-10`, `cung-moi-nguoi`. Khung chưa có ảnh vẫn cho bấm để xem thử ảnh trên máy (không lưu, không gửi đi). Nên thu nhỏ ảnh còn khoảng 1000px và xóa EXIF.

## Chạy thử

```bash
python -m http.server 8000
```

## Triển khai

- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main`, thư mục `/ (root)`.
- **Vercel:** import repo, Framework Preset chọn **Other**, để trống Build Command.
