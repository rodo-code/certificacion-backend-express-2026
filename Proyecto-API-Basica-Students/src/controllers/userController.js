import { saveUserInDB } from "../services/userService.js";

export async function registerUser(req, res, next){
    const {username, password, role} = req.body;
    const createdUser = await saveUserInDB(username,password,role);
    return res.success(200,`User created succesfully`,createdUser);
}