import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const loggerMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info(`${request.method} ${request.path} ${request.ip}`);
  next();
};

export default loggerMiddleware;