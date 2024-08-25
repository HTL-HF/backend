import { FormModel, QuestionModel } from "../interfaces/forms.interface";

export type RequestForm = Omit<FormModel, "_id" | "userId">
export type ResponseForm = RequestForm & { id: string };
export type ResponseQuestion = QuestionModel & { id: string };
