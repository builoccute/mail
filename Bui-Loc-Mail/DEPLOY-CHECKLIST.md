# Bui Loc Mail — Deploy Checklist

1. D1 `mail` và R2 `mail` đã tồn tại đúng Cloudflare account.
2. Resend đã Verify `builoc.name.vn`.
3. Cloudflare Worker Secrets `RESEND_API_KEY` và `SETUP_TOKEN` đã được nhập.
4. Deploy bằng `npx wrangler deploy`.
5. Mở `mail.builoc.name.vn` và chạy setup lần đầu bằng `builoc.contact@gmail.com`.
6. Xác nhận trong giao diện có mailbox `lienhe@builoc.name.vn`.
7. Email Routing → route/catch-all → Send to a Worker → `bui-loc-mail`.
8. Gửi thử từ Gmail vào `lienhe@builoc.name.vn`.
9. Trong Bui Loc Mail, gửi thử từ `lienhe@builoc.name.vn` ra `builoc.contact@gmail.com`.
10. Kiểm tra Inbox, Sent, attachment, reply và Admin → Hệ thống.
