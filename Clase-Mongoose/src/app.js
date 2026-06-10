import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import { connectDB } from "./data/mongoConnection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API Clase Mongoose funcionando"
  });
});

app.use("/students", studentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
