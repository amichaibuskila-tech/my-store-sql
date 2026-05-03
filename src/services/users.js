import clientPromise from './mongo';
import { ObjectId } from 'mongodb';

const DB_NAME = 'main';
const COLLECTION_NAME = 'users';

export async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.find().toArray();
}

export async function getUsersByEmail(email) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.find({ email: email }).toArray();
}

export async function createUser(user) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.insertOne(user);
}

export async function getUsersByPassword(password) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.find({ password: password }).toArray();
}

export async function deleteUser(id) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.deleteOne({ _id: new ObjectId(id) });
}