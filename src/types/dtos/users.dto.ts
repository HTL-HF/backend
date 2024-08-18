import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public username: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
  }
}

export type UserDTO = Omit<CreateUserDto, "password" | "username"> & { id: string };
export type UserLoginDTO = Pick<CreateUserDto, "password" | "username">;