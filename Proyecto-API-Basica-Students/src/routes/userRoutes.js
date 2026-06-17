import { Router } from "express";

import { registerUser, loginUser } from "../controllers/userController.js";
import { checkUsernameinDb } from "../services/userService.js";

const userRoutes = Router();

userRoutes.post("/register",(req,res,next) => {
    const {username} = req.body;
    if(!username){
        const error = Error("Username is required");
        error.statusCode = 400;
        return next(error);
    }
    if(checkUsernameinDb(username)){
        const error = Error("Username already exists");
        error.statusCode = 400;
        return next(error);
    }
}, registerUser);
userRoutes.post("/login",loginUser);

export default userRoutes;