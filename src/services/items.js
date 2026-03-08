import clientPromise from './mongo';
import { ObjectId } from 'mongodb';

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

export async function createItem(item) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.insertOne(item);
}

export async function deleteItem(id) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.deleteOne({ _id: new ObjectId(id) });
}

export async function updateItem(id, updatedData) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
}