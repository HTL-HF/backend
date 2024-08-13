import mongoose, { Schema, Document } from "mongoose";

interface IQuestion extends Document {
  title: string;
  description?: string;
  required: boolean;
  options?: (number | string)[];
  type: "NUMBER" | "STRING";
  viewType: "SHORT" | "LONG" | "CHECKBOX" | "RADIO" | "DROPDOWN" | "LINEAR";
}

interface IForm extends Document {
  title: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
  questions: IQuestion[];
}

const QuestionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  description: { type: String },
  required: { type: Boolean, required: true },
  type: { type: String, enum: ["NUMBER", "STRING"], required: true },
  viewType: {
    type: String,
    enum: ["SHORT", "LONG", "CHECKBOX", "RADIO", "DROPDOWN", "LINEAR"],
    required: true,
  },
  options: {
    type: [Schema.Types.Mixed],
  },
});

const FormSchema = new Schema<IForm>({
  title: { type: String, required: true },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [QuestionSchema],
});

export const Form = mongoose.model("Form", FormSchema);
