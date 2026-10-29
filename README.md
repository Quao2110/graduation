# Thư Mời Tốt Nghiệp · Trương Thị Thanh Huyền

Thư mời dự lễ tốt nghiệp online dạng **hành trình dạo vườn ngày tốt nghiệp 2.5D**: cuộn chuột hoặc vuốt như bình thường, cảnh trôi sang ngang như một game cuộn cảnh, có cáo con đi cùng.

Kỹ thuật hạt sáng và xếp tên bằng canvas tham khảo từ [TranMinh0903/Invitation-card](https://github.com/TranMinh0903/Invitation-card); thiết kế, bố cục, hình minh họa và nội dung làm mới.

## Sáu chặng

| # | Chặng | Nội dung |
|---|-------|----------|
| 1 | Ngày hội tốt nghiệp | Ảnh chân dung trong vòng nguyệt quế, tên tụ lại từ đom đóm và bướm, huy hiệu 4 năm · 1 tấm bằng · ∞ kỷ niệm |
| 2 | Cây ước nguyện | Thư cảm ơn treo trên cây, ảnh tân cử nhân, ba mẩu giấy biết ơn |
| 3 | Ngày mình tốt nghiệp | Sáu ảnh tốt nghiệp trong sáu khinh khí cầu to nhỏ bay lơ lửng |
| 4 | Hồ kỷ niệm | 54 ảnh polaroid trôi thành 3 dòng trên mặt hồ, bấm để xem lớn, lướt qua lại bằng nút, phím ← → hoặc vuốt |
| 5 | Cổng hoa | Thư mời, đếm ngày, chỉ đường, lưu vào lịch (.ics) |
| 6 | Hẹn gặp bạn | Ảnh cùng mọi người, mũ cử nhân tung lên, pháo đom đóm |

Hiệu ứng dân code: màn hình terminal "npm run graduate" lúc mở thiệp, ký hiệu code bay trên trời, huy hiệu `</>` kỹ sư phần mềm, dòng `git push origin tuong-lai` ở chặng cuối, lời chào trong DevTools console.

Điều hướng: cuộn/vuốt, thanh chặng ở dưới, hoặc phím ← →. Tôn trọng `prefers-reduced-motion`.

HTML, CSS, JavaScript thuần, không cần build. Toàn bộ hình vẽ là SVG sinh từ code (`js/sprite.js`), cảnh nền là các ô SVG lặp liền mạch.

## Cần điền trước khi gửi

| Nội dung | Ở đâu |
|----------|-------|
| Ngày, giờ, nơi (đã điền: 07.11.2026, 12h30, ĐH FPT TP.HCM) | `index.html`, danh sách `facts` |
| Giờ lễ (đếm ngày, file lịch), tên địa điểm cho lịch | `js/main.js`, đối tượng `EVENT` ở đầu file |

## Thêm ảnh

Đặt ảnh vào `assets/images/` rồi thêm `data-src` cho khung tương ứng trong `index.html`, ví dụ:

```html
<label class="photo-slot wreath-photo" data-slot="chan-dung" data-src="assets/images/chan-dung.jpg" data-label="Ảnh chân dung"></label>
```

Các khung: `chan-dung`, `tan-cu-nhan`, `tot-nghiep-1` … `tot-nghiep-6`, `cung-moi-nguoi`. Khung chưa có ảnh vẫn cho bấm để xem thử ảnh trên máy (không lưu, không gửi đi). Nên thu nhỏ ảnh còn khoảng 1000px và xóa EXIF.

**Album Hồ kỷ niệm:** ảnh nằm ở `assets/images/album/` (`01.jpg` … `54.jpg` bản lớn, `t01.jpg` … bản nhỏ). Kích thước bản nhỏ khai báo trong mảng `ALBUM` ở `js/main.js`; thêm hay bớt ảnh thì sửa cả mảng này.

## Chạy thử

```bash
python -m http.server 8000
```

## Triển khai

- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main`, thư mục `/ (root)`.
- **Vercel:** import repo, Framework Preset chọn **Other**, để trống Build Command.
