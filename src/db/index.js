import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    print(process.env.MONGO_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      dbName: DB_NAME,
    });
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;