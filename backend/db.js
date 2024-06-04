import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {});
  } catch (e) {
    console.error(`Cannot connect database: ${e.message}`);
    process.exit(1);
  }
}

export default connectDB;
