import {
    saveUserInDB,
    checkUserInDB,
    getUserByUsername
} from "../services/userService.js";

import { validateUserBody } from "../utils/userValidator.js";

export async function registerUser(req, res, next){
    const userValidator = validateUserBody(req.body);

    if(!userValidator.validation){
        const error = Error(userValidator.message);
        error.statusCode = 400;
        return next(error);
    }

    const {username, password, role} = req.body;
    const existingUser = await getUserByUsername(username);

    if(existingUser){
        const error = Error("Username already exists");
        error.statusCode = 409;
        return next(error);
    }

    const createdUser = await saveUserInDB(username,password,role);
    return res.success(200,`User created succesfully`,createdUser);
}

export async function loginUser(req, res, next){
    const {username, password} = req.body;
    const responseLogin = await checkUserInDB(username,password);
    if(responseLogin == null){
        const error = Error("Invalid credentials");
        error.statusCode = 401;
        return next(error);
    }
    return res.success(200,`Succesful Login`,responseLogin);
}
