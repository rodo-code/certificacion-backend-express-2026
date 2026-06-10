import mongoose from "mongoose";
import { seedStudents } from "./students.js";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado correctamente");
    await seedStudents();
  } catch (error) {
    console.error("Error conectando MongoDB:", error.message);
    process.exit(1);
  }
}
