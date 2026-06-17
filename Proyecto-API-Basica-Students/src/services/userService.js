import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../data/users.js";

export async function saveUserInDB(username, password, role) {

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        const error = new Error("Username already exists");
        error.statusCode = 409; 
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        password: hashedPassword,
        role
    });

    return {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
    };
}

export async function checkUserInDB(username, password) {

    const userInDB = await User.findOne({ username });

    if (userInDB == null) {
        return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        userInDB.password
    );

    if (!isPasswordCorrect) {
        return null;
    }

    const token = jwt.sign(
        {
            id: userInDB._id,
            username: userInDB.username,
            role: userInDB.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        username: userInDB.username,
        token
    };
}