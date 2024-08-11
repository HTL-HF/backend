import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
