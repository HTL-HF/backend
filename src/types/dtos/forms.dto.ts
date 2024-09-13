import { FormModel, QuestionModel } from "../interfaces/forms.interface";

export type RequestForm = Omit<FormModel, "_id" | "userId"> & {
  userId: string;
};
export type ResponseForm = RequestForm & { id: string };
export type ResponseQuestion = Omit<QuestionModel,"_id"> & { id: string };
