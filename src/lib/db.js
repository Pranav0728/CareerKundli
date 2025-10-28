import mongoose from "mongoose";

let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  console.log(process.env.MONGODB_URI);
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }
  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
}