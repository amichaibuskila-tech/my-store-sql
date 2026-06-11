import db from './sqlite';

export async function getAllItems() {
  return db.prepare('SELECT * FROM items').all();
}

export async function getItemsByCategory(name) {
  return db.prepare('SELECT * FROM items WHERE category = ?').all(name);
}

export async function createItem(item) {
  const now = new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO items (title, description, price, image, category, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const info = stmt.run(
    item.title || '',
    item.description || '',
    item.price || 0,
    item.image || null,
    item.category || null,
    now,
    now
  );
  return { lastInsertRowid: info.lastInsertRowid };
}

export async function createItems(items) {
  if (!Array.isArray(items) || items.length === 0) return { inserted: 0 };
  const insert = db.prepare(
    `INSERT INTO items (title, description, price, image, category, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const now = new Date().toISOString();

  const insertMany = db.transaction((rows) => {
    let count = 0;
    for (const item of rows) {
      insert.run(
        item.title || '',
        item.description || '',
        Number(item.price) || 0,
        item.image || null,
        item.category || null,
        now,
        now
      );
      count++;
    }
    return count;
  });

  const inserted = insertMany(items);
  return { inserted };
}

export async function deleteItem(id) {
  const stmt = db.prepare('DELETE FROM items WHERE id = ?');
  return stmt.run(id);
}

export async function updateItem(id, updatedData) {
  const parts = [];
  const values = [];
  for (const key of ['title', 'description', 'price', 'image', 'category']) {
    if (key in updatedData) {
      parts.push(`${key} = ?`);
      values.push(updatedData[key]);
    }
  }
  if (parts.length === 0) return { changes: 0 };
  values.push(new Date().toISOString());
  values.push(id);
  const sql = `UPDATE items SET ${parts.join(', ')}, updatedAt = ? WHERE id = ?`;
  const stmt = db.prepare(sql);
  return stmt.run(...values);
}