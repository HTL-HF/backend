import { StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class NotAcceptableError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_ACCEPTABLE);

    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }
}

export default NotAcceptableError;
