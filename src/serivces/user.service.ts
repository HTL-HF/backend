import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import {
  createUser,
  findByUsernameAndPassword,
} from "../repositories/users.repository";
import { UserLoginDTO } from "../types/dtos/users.dto";
import { UserModel } from "../types/interfaces/users.interface";
import { createCookie, createToken } from "../utils/jwt.utils";
import { MongoError } from "mongodb";

export const register = async (user: Omit<UserModel, "_id">) => {
  try {
    const createdUser: UserModel = await createUser(user);

    const tokenData = createToken(createdUser);
    
    return createCookie(tokenData);
  } catch (err) {
    if ((err as MongoError).code === 11000) {
      throw new ConflictError("Email or Username already taken");
    }
  }
};

export const login = async (user: UserLoginDTO) => {
  const createdUser = await findByUsernameAndPassword(user);

  if (!user) {
    throw new NotFoundError("User does not exist or password does not match");
  }

  const tokenData = createToken(createdUser as UserModel);

  return createCookie(tokenData);
};
