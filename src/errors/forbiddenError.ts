import { StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export default ForbiddenError;
