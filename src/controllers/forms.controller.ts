import { Request, Response, NextFunction } from "express";
import { addForm, deleteForm, getFormById } from "../services/forms.service";
import { StatusCodes } from "http-status-codes";
import { validateForm } from "../utils/validation.utils";

export const deleteFormHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await deleteForm(request.params.id, request.cookies["token"].token);
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
    validateForm(request.body);

    const form = await addForm(request.body, request.cookies["token"].token);
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
