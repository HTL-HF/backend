import { NextFunction, Request, Response } from "express";
import { CreateUserDto, UserLoginDTO } from "../types/dtos/users.dto";
import { login, register } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const registerHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userData: CreateUserDto = request.body;

    const { cookie } = await register(userData);
    response.cookie("token", cookie, { maxAge: 60 * 60 * 1000 });
    response.status(StatusCodes.CREATED).send("successfully registered");
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userData: UserLoginDTO = request.body;
    const { cookie } = await login(userData);

    response.cookie("token", cookie, { maxAge: 60 * 60 * 1000 });
    response.status(StatusCodes.OK).send("successfully logged in");
  } catch (err) {
    next(err);
  }
};
