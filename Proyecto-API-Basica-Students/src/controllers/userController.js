import { saveUserInDB, checkUserInDB, checkIfUsernameExists } from "../services/userService.js";

export async function registerUser(req, res, next){
    const {username, password, role} = req.body;
    
    const usernameExists = await checkIfUsernameExists(username);
    if(usernameExists){
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