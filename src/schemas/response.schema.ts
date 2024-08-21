import mongoose, { Document, Schema } from "mongoose";
import { ResponseModel } from "../types/interfaces/responses.interface";

const AnswerSchema = new Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: { type: Schema.Types.Mixed, required: true },
});

export const ResponseSchema = new Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  submittedAt: { type: Date, required: true, default: Date.now },
  answers: [AnswerSchema],
});

export const Responses = mongoose.model<ResponseModel & Document>(
  "Response",
  ResponseSchema
);
