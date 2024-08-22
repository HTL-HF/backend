import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import {
  createResponse,
  deleteResponse,
  findFormResponsesById,
  findResponseById,
} from "../repositories/responses.repository";
import { ResponseDTO } from "../types/dtos/responses.dto";
import { getUserFromToken } from "../utils/jwt.utils";
import { getFormById, isOwner } from "./forms.service";

export const getFormResponsesById = async (
  formId: string,
  token: string
): Promise<ResponseDTO[]> => {
  const userId = getUserFromToken(token).id;

  await isOwner(formId, userId);

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

export const saveResponse = async(
  response: Omit<ResponseDTO, "id"|"formId">,
  formId:string,
  token?: string,
): Promise<any> =>{
  if (token) {
    const userId = getUserFromToken(token).id;
    return await saveResponse({ ...response, userId },formId);
  } else {
    console.log({...response,formId})
    return (await createResponse({...response,formId})).toObject()._id;
  }
}

export const getResponseById = async (responseId: string) => {
  const response = await findResponseById(responseId);

  if (!response) {
    throw new NotFoundError(`Response with id ${responseId} not found`);
  }

  return response.toObject();
};

export const removeResponse = async (responseId: string, token: string) => {
  const response = await getResponseById(responseId);

  const userId = getUserFromToken(token).id;

  await isOwner(response.formId.toString(), userId);

  await deleteResponse(responseId);

  return response;
};
