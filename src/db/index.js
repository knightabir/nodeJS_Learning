import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    const connectionInstance = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: DB_NAME,
    });
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;