import { User } from "../data/users.js";

export async function getUserByUsername(username){
    const normalizedUsername = username.trim().toLowerCase();
    const foundUser = await User.findOne({ username: normalizedUsername });
    return foundUser;
}

export async function createUser(user){
    const createdUser = await User.create({
        username: user.username.trim().toLowerCase(),
        password: user.password
    });
    return createdUser;
}
