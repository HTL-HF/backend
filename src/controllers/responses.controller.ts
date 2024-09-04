import { NextFunction, Request, Response } from "express";
import {
  getFormResponsesById,
  removeResponse,
  saveResponse,
} from "../services/responses.service";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt.utils";

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
    const formId = request.params.formId;
    let createdResponseId;
    const tokenCookie = request.cookies["token"];

    if (tokenCookie) {
      verifyToken(tokenCookie.token);
      
      createdResponseId = await saveResponse(
        request.body,
        formId,
        tokenCookie.token
      );
      
    } else {
      createdResponseId = await saveResponse(request.body, formId);
    }

    response.status(StatusCodes.CREATED).json({ id: createdResponseId });
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
