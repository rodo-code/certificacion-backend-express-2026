import { Router } from "express";

import { registerUser } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/", registerUser);
userRoutes.post("/register", registerUser);

export default userRoutes;
