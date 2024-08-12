import { StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class ConflictError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
