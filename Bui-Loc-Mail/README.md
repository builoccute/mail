# Bui Loc Mail

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
