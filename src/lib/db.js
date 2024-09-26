let db;

export async function openDB() {
  if (typeof window === 'undefined') {
    if (!db) {
      const sqlite3 = await import('better-sqlite3');
      db = new sqlite3.default('./database.sqlite', { verbose: console.log });
      db.exec(`
        CREATE TABLE IF NOT EXISTS contact (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          message TEXT
        );
        CREATE TABLE IF NOT EXISTS members (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT
        );
        CREATE TABLE IF NOT EXISTS waitlist (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT
        );
      `);
    }
    return db;
  }
  return null;
}

export async function initDB() {
  await openDB();
}