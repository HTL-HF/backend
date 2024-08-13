import { CreateUserDto, UserLoginDTO } from "../types/dtos/users.dto";
import Users from "../schemas/user.schema";

export const createUser = async (user: CreateUserDto) => {
  return await Users.create(user);
};

export const findByUsernameAndPassword = async (user: UserLoginDTO) => {
  return await Users.findOne({ ...user });
};
