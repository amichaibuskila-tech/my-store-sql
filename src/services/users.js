import db from './sqlite';

export async function getAllUsers() {
  return db.prepare('SELECT * FROM users').all();
}

export async function getUsersByEmail(email) {
  const row = db.prepare('SELECT * FROM users WHERE email = ?').all(email);
  return row;
}

export async function createUser(user) {
  const now = new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO users (name, email, password, photoURL, googleId, provider, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const info = stmt.run(
    user.name || '',
    user.email,
    user.password || null,
    user.photoURL || user.photo || null,
    user.googleId || user.uid || null,
    user.provider || null,
    now,
    now
  );
  return { lastInsertRowid: info.lastInsertRowid };
}

export async function getUsersByPassword(password) {
  return db.prepare('SELECT * FROM users WHERE password = ?').all(password);
}

export async function deleteUser(id) {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  return stmt.run(id);
}

export async function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export async function upsertUserByEmail(user) {
  const now = new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO users (name, email, password, photoURL, googleId, provider, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
       name=excluded.name,
       password=COALESCE(excluded.password, users.password),
       photoURL=excluded.photoURL,
       googleId=excluded.googleId,
       provider=excluded.provider,
       updatedAt=excluded.updatedAt`
  );

  stmt.run(
    user.name || '',
    user.email,
    user.password || null,
    user.photoURL || user.photo || null,
    user.googleId || user.uid || null,
    user.provider || null,
    now,
    now
  );

  return db.prepare('SELECT * FROM users WHERE email = ?').get(user.email);
}