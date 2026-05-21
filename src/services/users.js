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

export async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  return collection.findOne({ email: email });
}

export async function upsertUserByEmail(user) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const update = {
    $set: {
      name: user.name || '',
      email: user.email,
      photoURL: user.photoURL || user.photo || '',
      googleId: user.googleId || user.uid || null,
      provider: user.provider || null,
      updatedAt: new Date(),
    },
    $setOnInsert: {
      createdAt: new Date(),
    },
  };

  const res = await collection.findOneAndUpdate(
    { email: user.email },
    update,
    { upsert: true, returnDocument: 'after' }
  );

  return res.value;
}