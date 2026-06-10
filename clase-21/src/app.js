import express from "express";
import mongoose from "mongoose";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", studentRoutes);

mongoose.connect("mongodb://localhost:27017/tu_base_de_datos")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexion", err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});