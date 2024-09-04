import { NextFunction, Request, Response } from "express";
import {
  getFormResponsesById,
  removeResponse,
  saveResponse,
} from "../services/responses.service";
import { StatusCodes } from "http-status-codes";
import { getUserFromToken, verifyToken } from "../utils/jwt.utils";
import { verifyResponseValidity } from "../utils/validation.utils";
import { isOwner } from "../services/forms.service";

export const getResponsesHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = getUserFromToken(request.cookies["token"].token);

  try {
    await isOwner(request.params.formId, user.id);

    const responses = await getFormResponsesById(request.params.formId, user);
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

    await verifyResponseValidity(request.body, formId);

    if (tokenCookie) {
      verifyToken(tokenCookie.token);

      const user = getUserFromToken(tokenCookie.token);

      createdResponseId = await saveResponse(request.body, formId, user);
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
    const user = getUserFromToken(request.cookies["token"].token);

    await isOwner(request.params.id, user.id);

    const deletedResponse = await removeResponse(request.params.id, user);

    response
      .status(StatusCodes.OK)
      .send(`deleted response with ID ${deletedResponse._id}`);
  } catch (err) {
    next(err);
  }
};
