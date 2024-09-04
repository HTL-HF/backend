import { Request, Response, NextFunction } from "express";
import { addForm, deleteForm, getFormById } from "../services/forms.service";
import { StatusCodes } from "http-status-codes";
import { getUserFromToken } from "../utils/jwt.utils";
import { validateForm } from "../utils/validation.utils";

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
    await validateForm(request.body);

    const form = await addForm(request.body, user);

    response.status(StatusCodes.CREATED).json(form);
  } catch (err) {
    next(err);
  }
};

export const getFormByIdHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const form = await getFormById(request.params.id);
    response.status(StatusCodes.OK).json(form);
  } catch (err) {
    next(err);
  }
};
