import { AnswerModel, ResponseModel } from "../interfaces/responses.interface";

export type AnswerDTO = Omit<AnswerModel, "_id" | "question_id"> & {
  id: string;
  question_id: string;
};
export type ResponseDTO = Omit<
  ResponseModel,
  "_id" | "formId" | "userId" | "answers"
> & { id: string; formId: string; userId?: string; answers: AnswerDTO[] };
