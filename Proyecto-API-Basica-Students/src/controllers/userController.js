import {
  createUser,
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

  const existingUser = await getUserByUsername(req.body.username);

  if(existingUser){
    const error = Error("Username already exists");
    error.statusCode = 409;
    return next(error);
  }

  const newUser = await createUser({
    username: req.body.username,
    password: req.body.password
  });

  return res.success(201, "User created succesfully", {
    id: newUser._id,
    username: newUser.username
  });
}
