import mongoose from "mongoose";

export interface AnswerModel {
  _id: string;
  questionId: mongoose.Types.ObjectId;
  answer: string | number;

}

export interface ResponseModel {
  _id: string;
  formId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  submittedAt: Date;
  answers: AnswerModel[];
}
