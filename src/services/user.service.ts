import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import {
  createUser,
  findByUsernameAndPassword,
} from "../repositories/users.repository";
import { CreateUserDto, UserLoginDTO } from "../types/dtos/users.dto";
import { UserModel } from "../types/interfaces/users.interface";
import { createCookie, createToken } from "../utils/jwt.utils";
import { MongoError } from "mongodb";

export const register = async (user: CreateUserDto) => {
  try {
    const createdUser: UserModel = await createUser(user);

    const tokenData = createToken(createdUser);

    return { cookie: createCookie(tokenData), id: createdUser._id };
  } catch (err) {
    if ((err as MongoError).code === 11000) {
      throw new ConflictError("Email or Username already taken");
    }

    throw err;
  }
};

export const login = async (user: UserLoginDTO) => {
  const loggedUser = await findByUsernameAndPassword(user);

  if (!loggedUser) {
    throw new NotFoundError("User does not exist or password does not match");
  }

  const tokenData = createToken(loggedUser as UserModel);

  return { cookie: createCookie(tokenData), id: (loggedUser as UserModel)._id };
};
