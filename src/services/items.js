import clientPromise from './mongo';

const DB_NAME = 'main';
const COLLECTION_NAME = 'items';

export async function getAllItems() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.find().toArray();
}

export async function getItemsByCategory(name) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.find({ category: name }).toArray();
}