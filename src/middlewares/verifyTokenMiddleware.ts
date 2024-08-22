import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError";
import { verifyToken } from "../utils/jwt.utils";

const verifyTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (request.cookies && request.cookies["token"]) {
      const token = request.cookies["token"].token;

      verifyToken(token);
    } else {
      throw new UnauthorizedError("You must include an authentication token");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default verifyTokenMiddleware;
