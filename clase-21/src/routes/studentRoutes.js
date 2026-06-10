import { Router } from "express";
import { getStudents } from "../controllers/studentController.js";

const router = Router();

router.get("/students", getStudents);

export default router;