// lib/db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // ✅ If already connected, reuse existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // ✅ For test mock: throw error if connection failed
  if (mongoose.connection.readyState === 0 && process.env.NODE_ENV === 'test') {
  await mongoose.connect(MONGODB_URI);
}


  // ✅ Connect only once
  if (!cached.conn) {
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
  }

  return cached.conn;
}
