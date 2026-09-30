# Bui Loc Mail V1.0

Hệ thống webmail cá nhân cho `builoc.name.vn`, chuyển đổi từ nền mail cũ thành một project độc lập. Một Cloudflare Worker xử lý website/API và Email Routing.

## Cấu hình đã gắn sẵn

- Worker: `bui-loc-mail`
- Webmail: `mail.builoc.name.vn`
- D1 binding `DB` → database `mail`
- D1 ID: `f1f6b9b1-66c6-4d0e-b57b-3776fe3d6b82`
- R2 binding `MAIL_STORAGE` → bucket `mail`
- Domain thư: `builoc.name.vn`
- Super Admin mặc định khi setup: `builoc.contact@gmail.com`
- Hộp thư chính tự liên kết: `lienhe@builoc.name.vn`
- Gửi thư Internet: Resend qua secret `RESEND_API_KEY`
- Nhận thư Internet: Cloudflare Email Routing → Worker `bui-loc-mail`

## Tính năng

Inbox / Sent / Drafts / Spam / Trash, tìm kiếm, unread/star/bulk actions, reply/forward/reply-all, HTML composer, auto-save draft, template, chữ ký, attachment, inline image, contacts, labels, rules, notifications, avatar, sessions, theme, aliases, multi-domain, account/role/permission management, audit log và dashboard quản trị.

Raw email và tệp nặng nằm trong R2; D1 giữ tài khoản, metadata và chỉ mục.

## Deploy

```bash
npm install
npm run validate
npx wrangler deploy
```

`wrangler.jsonc` đã khai báo custom domain `mail.builoc.name.vn`. Sau deploy, vào Cloudflare Email Routing của `builoc.name.vn` và đặt route/catch-all cần thiết sang Worker `bui-loc-mail`.

### Worker Secrets

Tạo 2 Worker Secrets (không commit vào GitHub):

```text
RESEND_API_KEY
SETUP_TOKEN
```

`SETUP_TOKEN` là mã riêng do bạn tự đặt để chặn người khác chiếm quyền thiết lập Super Admin trước lần đăng nhập đầu tiên. Dùng chuỗi dài, khó đoán; nhập lại mã này đúng một lần ở màn hình setup.

Không commit API key vào GitHub. Domain `builoc.name.vn` phải được Verify trong Resend trước khi gửi.

## Thiết lập lần đầu

Mở `mail.builoc.name.vn`. Form setup được điền sẵn tên `Bui Loc` và email quản trị `builoc.contact@gmail.com`; nhập `SETUP_TOKEN` và tự đặt mật khẩu tại đây. Sau khi setup, hệ thống tự tạo/liên kết `lienhe@builoc.name.vn` làm mailbox chính.

## Lưu ý Email Routing

Email Routing chỉ chuyển được thư tới Worker sau khi Worker đã tồn tại. Nếu trước deploy catch-all đang là Drop, sau deploy đổi destination sang Worker `bui-loc-mail`. Hộp thư/alias không tồn tại trong Bui Loc Mail sẽ bị Worker từ chối thay vì nhận nhầm.

## Bui Loc Mail V1.0 — 30/09/2026

- Giao diện Login/Inbox/Reader/Compose/Settings dùng chung một design system Bui Loc Mail.
- Màn đăng nhập không hiển thị tên miền hạ tầng.
- Trình soạn thư là một workspace toàn màn hình riêng, không phủ mờ Inbox và không còn lỗi cắt nội dung của cửa sổ nổi.
- Tại **Tài khoản → Giao diện**, người dùng được phép có thể đổi theme, màu nhấn, mật độ, cỡ UI, bo góc, hiệu ứng kính, sidebar, độ rộng danh sách, khung đọc thư và chuyển động. Trình soạn kế thừa toàn bộ theme của tài khoản.
- Tại **Tài khoản → Nhận thư** (Admin/Super Admin) có bảng chẩn đoán inbound. Nếu gửi thử mà không có sự kiện mới, Email Routing chưa chạy vào Worker `bui-loc-mail`.
- Worker tự kiểm tra và khôi phục `PRIMARY_MAILBOX` cho Super Admin nếu D1 cũ chưa có địa chỉ này.
- Thư đến được ghi trạng thái `accepted` → `stored` hoặc `rejected/failed` trong `inbound_events` để dễ xác định lỗi Routing/Worker/D1/R2.
