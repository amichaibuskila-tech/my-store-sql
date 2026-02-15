import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

// if (!uri) {
//   throw new Error('Please add your Mongo URI (MONGODB_URI or MONGO_URI) to .env.local');
// }

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;



