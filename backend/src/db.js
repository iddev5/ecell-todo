import mongoose from "mongoose";
import {URL} from 'url';

async function connectDB() {
  try {
    const url = process.env.MONGO_URL;
    if (url === undefined) console.error('URL is undefined');
    const conn = await mongoose.connect(url, {});
  } catch (e) {
    console.error(`Cannot connect database: ${e.message}`);
    process.exit(1);
  }
}

export default connectDB;
