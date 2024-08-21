import { NextFunction, Request, Response } from "express";
import {
  getFormResponsesById,
  removeResponse,
  saveResponse,
} from "../services/responses.service";
import { StatusCodes } from "http-status-codes";

export const getResponsesHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const responses = await getFormResponsesById(
      request.params.formId,
      request.cookies["token"].token
    );
    response.status(StatusCodes.OK).json(responses);
  } catch (err) {
    next(err);
  }
};

export const saveResponseHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = await saveResponse(request.body);

    response.status(StatusCodes.OK).json({ id });
  } catch (err) {
    next(err);
  }
};

export const removeResponseHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const deletedResponse = await removeResponse(
      request.params.id,
      request.cookies["token"].token
    );

    response
      .status(StatusCodes.OK)
      .send(`deleted response with ID ${deletedResponse._id}`);
  } catch (err) {
    next(err);
  }
};
