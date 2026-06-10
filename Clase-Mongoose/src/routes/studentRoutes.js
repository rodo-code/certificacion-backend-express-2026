import { Router } from "express";
import { findStudents } from "../controllers/studentController.js";

const studentRoutes = Router();

studentRoutes.get("/", findStudents);

export default studentRoutes;
