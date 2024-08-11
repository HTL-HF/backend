import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const errorMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction,
    error: unknown
) => {};

export default errorMiddleware;
