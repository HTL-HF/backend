import mongoose, { Schema } from "mongoose";
import { FormModel } from "../types/interfaces/forms.interface";

const QuestionsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  required: { type: Boolean, required: true },
  type: { type: String, enum: ["number", "string"], required: true },
  viewType: {
    type: String,
    enum: [
      "SHORT",
      "LONG",
      "CHECKBOX",
      "RADIO",
      "DROPDOWN",
      "LINEAR",
      "DATE",
      "TIME",
    ],
    required: true,
  },
  options: {
    type: [Schema.Types.Mixed],
    required: false,
    default: undefined,
  },
});

const FormsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [QuestionsSchema],
});

const Forms = mongoose.model<FormModel & Document>("Form", FormsSchema);
export default Forms;
