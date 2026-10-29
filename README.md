# Thư Mời Tốt Nghiệp · Trương Thị Thanh Huyền

Thư mời dự lễ tốt nghiệp online theo chủ đề **vườn thần tiên**: hoa, bướm 2.5D, cánh hoa rơi và đom đóm.

Dựa trên mã nguồn [TranMinh0903/Invitation-card](https://github.com/TranMinh0903/Invitation-card), vẽ lại toàn bộ hình minh họa và đổi nội dung.

## Tính năng

- **Màn mở đầu:** bộ bài thần tiên trên quyển sách hoa. Chọn một lá thì lá bài bay ra giữa, xoay, phát sáng rồi lật ra ảnh chân dung; các lá còn lại tan thành cánh hoa bay xếp thành tên.
- **Chiều sâu 2.5D:** cảnh nền nhiều lớp dịch chuyển theo chuột (trăng, thân hoa lớn, bó hoa, thảm cỏ, nấm), bướm vỗ cánh bằng CSS 3D, cánh hoa vừa rơi vừa lật.
- **Thư mời:** lời cảm ơn, ba đóa hoa (quá khứ, hiện tại, tương lai), album kỷ niệm, phong bì có đếm ngược tới ngày lễ.
- Bướm bay theo khi cuộn, con trỏ rắc cánh hoa, bấm để tung hoa.
- Responsive, tôn trọng `prefers-reduced-motion`.

HTML, CSS, JavaScript thuần, không cần build. Toàn bộ hình vẽ là SVG sinh từ code (`js/sprite.js`).

## Cần điền trước khi gửi

| Nội dung | Ở đâu |
|----------|-------|
| Ngành học, tên trường | `index.html`, dòng `letter-major` |
| Ngày, giờ, tên và địa chỉ địa điểm | `index.html`, mục `details` |
| Link "Xem đường đi" | `index.html`, thêm tên địa điểm sau `query=` |
| Giờ lễ cho đếm ngược | `js/main.js`: `EV_START`, `EV_END` (giờ UTC, tức giờ Việt Nam trừ 7) |

## Thêm ảnh

Đặt ảnh vào `assets/images/` rồi thêm thuộc tính `data-src` cho khung tương ứng trong `index.html`, ví dụ:

```html
<label class="photo-slot tc-photo" data-slot="chan-dung" data-src="assets/images/chan-dung.jpg" data-label="Ảnh chân dung"></label>
```

Các khung: `chan-dung`, `tan-cu-nhan`, `thoi-sinh-vien`, `ao-cu-nhan`, `album-1` … `album-6`. Khung chưa có ảnh vẫn cho bấm để xem thử ảnh trên máy (không lưu, không gửi đi). Nên thu nhỏ ảnh còn khoảng 1000px và xóa EXIF.

## Chạy thử

```bash
python -m http.server 8000
# hoặc
npx serve .
```

## Triển khai

- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main`, thư mục `/ (root)`.
- **Vercel:** import repo, Framework Preset chọn **Other**, để trống Build Command.
