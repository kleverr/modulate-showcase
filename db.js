const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'rate-limit.db');

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000');

db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_ip TEXT NOT NULL,
    model TEXT,
    file_name TEXT,
    file_size INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_requests_ip_date
    ON requests (user_ip, created_at);
`);

const countStmt = db.prepare(`
  SELECT COUNT(*) AS count FROM requests
  WHERE user_ip = ? AND created_at >= datetime('now', ?)
`);

const insertStmt = db.prepare(`
  INSERT INTO requests (user_ip, model, file_name, file_size)
  VALUES (?, ?, ?, ?)
`);

function countRecentByIp(ip, windowMinutes) {
  const result = countStmt.get(ip, `-${windowMinutes} minutes`);
  return result.count;
}

function insertRequest(ip, model, fileName, fileSize) {
  insertStmt.run(ip, model, fileName, fileSize);
}

module.exports = { countRecentByIp, insertRequest };
