import ForbiddenError from "../errors/ForbiddenError";
import NotAcceptableError from "../errors/NotAcceptableError";
import NotFoundError from "../errors/NotFoundError";
import {
  createResponse,
  deleteResponse,
  findFormResponsesById,
  findResponseById,
} from "../repositories/responses.repository";
import { ResponseQuestion } from "../types/dtos/forms.dto";
import { AnswerDTO, ResponseDTO } from "../types/dtos/responses.dto";
import { UserDTO } from "../types/dtos/users.dto";
import { QuestionModel } from "../types/interfaces/forms.interface";
import { inArray } from "../utils/array.utils";
import { getUserFromToken, verifyToken } from "../utils/jwt.utils";
import { verifyResponseValidity } from "../utils/validation.utils";
import { getFormById, isOwner } from "./forms.service";

export const getFormResponsesById = async (
  formId: string,
  user: UserDTO
): Promise<ResponseDTO[]> => {
  const responses = (await findFormResponsesById(formId)).map((response) => {
    const responseObject = response.toObject();

    const returnResponse: Omit<ResponseDTO, "userId"> = {
      ...responseObject,
      id: responseObject._id,
      formId: responseObject.formId.toString(),
      answers: responseObject.answers.map((answer) => {
        return {
          ...answer,
          id: answer._id,
          questionId: answer.questionId.toString(),
        };
      }),
    };

    return responseObject.userId
      ? { ...returnResponse, userId: responseObject.userId.toString() }
      : returnResponse;
  });

  return responses;
};

export const saveResponse = async (
  response: Omit<ResponseDTO, "id" | "formId">,
  formId: string,
  user?: UserDTO
): Promise<string> => {
  if (user) {
    response = { ...response, userId: user.id };
  }

  return (await createResponse({ ...response, formId })).toObject()._id;
};

export const getResponseById = async (responseId: string) => {
  const response = await findResponseById(responseId);

  if (!response) {
    throw new NotFoundError(`Response with id ${responseId} not found`);
  }

  return response.toObject();
};

export const removeResponse = async (responseId: string, user: UserDTO) => {
  const response = await getResponseById(responseId);

  await deleteResponse(responseId);

  return response;
};
