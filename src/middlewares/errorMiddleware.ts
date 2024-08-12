import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import BaseError from "../errors/BaseError";
import { StatusCodes } from "http-status-codes";

const errorMiddleware = async (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    logger.warn(
      `${request.method} ${request.url} resulted in ${error.statusCode} with message ${error.message}`
    );

    await response.status(error.statusCode).send(error.message);
  } else if (error instanceof Error) {
    logger.error(
      `${request.method} ${request.url} resulted in ${StatusCodes.INTERNAL_SERVER_ERROR} with message ${error.message}`
    );
    console.log(error.stack);

    await response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.message);
  } else {
    logger.error(
      `${request.method} ${request.url} resulted in ${StatusCodes.INTERNAL_SERVER_ERROR} with message`
    );

    await response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("UNKNOWN");
  }
  next(error);
};

export default errorMiddleware;
