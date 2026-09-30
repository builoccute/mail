-- Bui Loc Mail 2026-09-30 — chẩn đoán thư đến.
-- Các cột giao diện người dùng được ensureSchema() bổ sung an toàn trên DB hiện hữu.
CREATE TABLE IF NOT EXISTS inbound_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipient TEXT NOT NULL,
  sender TEXT,
  subject TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  detail TEXT,
  message_id INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(message_id) REFERENCES messages(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_inbound_events_created ON inbound_events(created_at DESC);
