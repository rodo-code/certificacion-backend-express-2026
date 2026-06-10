import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  site: String,
  active: Boolean
});

export const Student = mongoose.model("Student", studentSchema);