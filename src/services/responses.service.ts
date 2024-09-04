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
import { getFormById, isOwner } from "./forms.service";

export const getFormResponsesById = async (
  formId: string,
  user: UserDTO
): Promise<ResponseDTO[]> => {
  const userId = user.id;

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

export const saveResponse = async (
  response: Omit<ResponseDTO, "id" | "formId">,
  formId: string,
  token?: string
): Promise<string> => {
  if (token) {
    const userId = getUserFromToken(token).id;

    return await saveResponse({ ...response, userId }, formId);
  } else {
    await verifyResponseValidity(response, formId);

    return (await createResponse({ ...response, formId })).toObject()._id;
  }
};

export const getResponseById = async (responseId: string) => {
  const response = await findResponseById(responseId);

  if (!response) {
    throw new NotFoundError(`Response with id ${responseId} not found`);
  }

  return response.toObject();
};

export const removeResponse = async (responseId: string, user:UserDTO) => {
  const response = await getResponseById(responseId);

  const userId = user.id;

  await isOwner(response.formId.toString(), userId);

  await deleteResponse(responseId);

  return response;
};

const verifyResponseValidity = async (
  response: Omit<ResponseDTO, "id" | "formId">,
  formId: string
) => {
  const questions = (await getFormById(formId)).questions;

  for (const question of questions) {
    const answer = response.answers.find(
      (answer) => answer.questionId === question.id.toString()
    );

    if (!answer) {
      if (question.required)
        throw new NotAcceptableError(
          `question ${question.id} is required but was not answered`
        );
    } else {
      assertTypes(question, answer);
      assertOptions(question, answer);
    }
  }
};

const assertTypes = (question: ResponseQuestion, answer: AnswerDTO) => {
  if (
    question.type !== typeof answer.answer &&
    !(
      Array.isArray(answer.answer) &&
      answer.answer.every((answer) => typeof answer === typeof question.type)
    )
  ) {
    throw new NotAcceptableError(
      `question ${question.id} is of type ${
        question.type
      } and answer is of type ${
        Array.isArray(answer.answer)
          ? typeof answer.answer[0]
          : typeof answer.answer
      } `
    );
  }
};

const assertOptions = (question: ResponseQuestion, answer: AnswerDTO) => {
  if (!question.options) return;

  const { viewType } = question;
  const { answer: ans } = answer;

  if (viewType === "CHECKBOX") {
    if (!Array.isArray(ans) || !ans.every((item) => question.options!.includes(item))) {
      throw new NotAcceptableError(
        `Your answer must be an array and part of the available options for question ${question.id}`
      );
    }
  } else if (Array.isArray(ans) || !question.options.includes(ans)) {
    throw new NotAcceptableError(
      `Your answer must be a single value and part of the available options for question ${question.id}`
    );
  }
};

