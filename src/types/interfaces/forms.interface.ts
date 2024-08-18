import mongoose from "mongoose";

export interface QuestionModel {
  title: string;
  description?: string;
  required: boolean;
  options?: (number | string)[];
  type: "NUMBER" | "STRING";
  viewType:
    | "SHORT"
    | "LONG"
    | "CHECKBOX"
    | "RADIO"
    | "DROPDOWN"
    | "LINEAR"
    | "DATE"
    | "TIME";
}

export interface FormModel {
  filename: string;
  _id: string;
  title: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
  questions: QuestionModel[];
}
