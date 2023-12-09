import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv';

dotenv.config(); // Include this line to load environment variables

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDB is Connected !! DB Host ${conn.connection.host}`);
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1);
  }
}

export default connectDB;
