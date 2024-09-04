import { Request, Response, NextFunction } from "express";
import { addForm, deleteForm } from "../services/forms.service";
import { StatusCodes } from "http-status-codes";
import { getUserFromToken } from "../utils/jwt.utils";

export const deleteFormHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserFromToken(request.cookies["token"].token);
    await deleteForm(request.params.id, user);
    response.status(StatusCodes.OK).send("Successfully deleted form");
  } catch (err) {
    next(err);
  }
};

export const addFormHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserFromToken(request.cookies["token"].token);
    const form = await addForm(request.body, user);
    response.status(StatusCodes.CREATED).json(form);
  } catch (err) {
    next(err);
  }
};
