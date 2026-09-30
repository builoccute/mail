# Bui Loc Mail — Deploy checklist

1. Cloudflare Secrets: `RESEND_API_KEY`, `SETUP_TOKEN` (không commit giá trị vào Git).
2. D1 binding `DB` → database `mail` (`f1f6b9b1-66c6-4d0e-b57b-3776fe3d6b82`).
3. R2 binding `MAIL_STORAGE` → bucket `mail`.
4. Chạy `npx wrangler d1 migrations apply DB --remote` để áp dụng migration mới nếu chưa chạy.
5. Deploy bằng `npx wrangler deploy`.
6. Email Routing của `builoc.name.vn`: rule nhận thư phải dùng **Send to a Worker** → `bui-loc-mail` và ở trạng thái Active.
7. Đăng nhập → Tài khoản → **Nhận thư**. Gửi một thư thử từ tài khoản ngoài hệ thống.
   - Có `accepted` rồi `stored`: Worker nhận và lưu thư thành công.
   - Có `rejected`: địa chỉ chưa map vào mailbox/alias.
   - Có `failed`: xem chi tiết lỗi D1/R2 trong dòng sự kiện và Worker Logs.
   - Không có sự kiện mới: Email Routing chưa đi vào Worker này.
8. Xác nhận `lienhe@builoc.name.vn` xuất hiện và là hộp thư chính. Bản này tự khôi phục mailbox chính trên D1 cũ nếu cần.
9. Gửi thử `lienhe@builoc.name.vn` → Gmail để kiểm tra Resend.
10. Tài khoản → **Giao diện** để chọn theme/layout cá nhân; không cần sửa code.
