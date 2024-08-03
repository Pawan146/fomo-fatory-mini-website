// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;
const options = {};

interface ConnectType {
  db: Db;
  client: MongoClient;
}

declare global {
  var _mongoClientPromise: Promise<ConnectType> | undefined; // Use `var` to declare a global variable
}

let client: MongoClient;
let clientPromise: Promise<ConnectType>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((client): ConnectType => {
      return { client, db: client.db() };
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((client): ConnectType => {
    return { client, db: client.db() };
  });
}

export default clientPromise;