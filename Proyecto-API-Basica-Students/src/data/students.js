import mongoose from "mongoose";

export const studentList = [];

const studentSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  grade: { type: Number, required: true },
  site: { type: String, required: true },
  active: { type: Boolean, required: true }
});

export const Student = mongoose.model("Student", studentSchema);