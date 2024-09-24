import Database from 'better-sqlite3';

let db;

export function openDB() {
  if (!db) {
    db = new Database('./database.sqlite', { verbose: console.log });
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

// Initialize the database and create tables if they don't exist
export function initDB() {
  openDB();
}