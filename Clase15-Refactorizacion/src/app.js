import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello from Express</h1>");
});

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});