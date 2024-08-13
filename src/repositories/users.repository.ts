import { UserLoginDTO } from "../dtos/users.dto";
import Users, { IUser } from "../schemas/user";

export const createUser = async (user: IUser) => {
  return await Users.create(user);
};

export const findByUsernameAndPassword = async (user: UserLoginDTO) => {
  return await Users.findOne({ ...user });
};
