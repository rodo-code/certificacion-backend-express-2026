import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required in the .env file");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB conectado correctamente");
}
