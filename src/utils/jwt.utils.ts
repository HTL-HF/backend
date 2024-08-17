import { UserDTO } from "../types/dtos/users.dto";
import { sign } from "jsonwebtoken";
import { UserModel } from "../types/interfaces/users.interface";
import { TokenData } from "../types/interfaces/auth.interface";

export const createToken = (user: UserModel) => {
  const dataStoredInToken: UserDTO = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const secretKey: string = process.env.JWT_SECRET_KEY || "very secret key";
  const expiresIn = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
};


