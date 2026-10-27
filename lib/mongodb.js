import mongoose from "mongoose";

// Reuse one connection across hot reloads and concurrent requests
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectToDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Please define MONGODB_URI in .env.local");

  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(uri);

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
  return cached.conn;
}
