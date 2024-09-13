import { UserDTO } from "../types/dtos/users.dto";
import { decode, sign, verify } from "jsonwebtoken";
import { UserModel } from "../types/interfaces/users.interface";
import UnauthorizedError from "../errors/UnauthorizedError";

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || "very secret key";

export const createToken = (user: UserModel) => {
  const dataStoredInToken: UserDTO = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const expiresIn = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }),
  };
};

export const getUserFromToken = (token: string): UserDTO => {
  return decode(token) as UserDTO;
};

export const verifyToken = (token: string) => {
  try {
    verify(token, SECRET_KEY, { ignoreExpiration: false });
  } catch (err) {
    throw new UnauthorizedError("Invalid JWT token");
  }
};
