// lib/mongodb.ts
import mongoose from "mongoose";
// Import schemas to ensure they are registered
import "@/lib/Schemas";

let isConnected = false; // global connection state

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.MONGODB_DB || undefined,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
