import bcrypt from "bcrypt";
import { User } from "../data/users.js";

export async function saveUserInDB(username, password, role){
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        username,
        password: hashedPassword,
        role
    });
    const responseUser = {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
    };
    return responseUser;
}