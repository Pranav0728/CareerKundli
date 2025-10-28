import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/* -------------------- MONGOOSE SETUP -------------------- */
let cachedMongoose = global.mongoose;

if (!cachedMongoose) {
  cachedMongoose = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cachedMongoose.conn) return cachedMongoose.conn;

  if (!cachedMongoose.promise) {
    const opts = { bufferCommands: false };
    cachedMongoose.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => mongoose);
  }

  try {
    cachedMongoose.conn = await cachedMongoose.promise;
  } catch (e) {
    cachedMongoose.promise = null;
    throw e;
  }

  return cachedMongoose.conn;
}

/* -------------------- MONGODB CLIENT FOR NEXTAUTH -------------------- */
let cachedClient = global.mongoClient;

if (!cachedClient) {
  cachedClient = global.mongoClient = { client: null, promise: null };
}

export async function getClient() {
  if (cachedClient.client) return cachedClient.client;

  if (!cachedClient.promise) {
    const client = new MongoClient(MONGODB_URL);
    cachedClient.promise = client.connect().then((connectedClient) => connectedClient);
  }

  cachedClient.client = await cachedClient.promise;
  return cachedClient.client; // this is the MongoClient instance
}

/* -------------------- EXPORT -------------------- */
export default dbConnect;
