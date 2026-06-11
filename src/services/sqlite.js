import Database from 'better-sqlite3';

const DB_PATH = process.env.SQLITE_DB_PATH || 'data/database.db';
const db = new Database(DB_PATH);

function init() {
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      photoURL TEXT,
      googleId TEXT,
      provider TEXT,
      createdAt TEXT,
      updatedAt TEXT
    );
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL,
      image TEXT,
      category TEXT,
      createdAt TEXT,
      updatedAt TEXT
    );
  `);
}

init();

export default db;
