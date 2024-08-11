import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError";

class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
