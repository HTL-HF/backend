import { IUser } from "../schemas/user";

export type UserDTO = Omit<IUser, "password" | "username"> & { id: string };
export type UserLoginDTO = Pick<IUser, "password" | "username">;
