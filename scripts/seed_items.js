const Database = require('better-sqlite3');
const db = new Database('data/database.db');

const items = [
  { title: 'UltraPhone X', description: 'Flagship smartphone', price: 999.99, image: '', category: 'smartphone' },
  { title: 'Workstation Pro', description: 'High-end computer', price: 1999.0, image: '', category: 'computer' },
  { title: 'SmartWatch Lite', description: 'Affordable smartwatch', price: 199.0, image: '', category: 'smartwatch' }
];

const insert = db.prepare(`INSERT INTO items (title, description, price, image, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`);
const now = new Date().toISOString();

for (const item of items) {
  const info = insert.run(item.title, item.description, item.price, item.image, item.category, now, now);
  console.log('Inserted item id', info.lastInsertRowid, item.title);
}

console.log('Seeding complete.');
