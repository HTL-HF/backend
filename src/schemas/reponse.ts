import mongoose, { Schema, Document } from 'mongoose';

interface IAnswer extends Document {
    questionId: mongoose.Types.ObjectId;
    answer: string | number;
}

interface IResponse extends Document {
    formId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    submitted_at: Date;
    answers: IAnswer[];
}

const AnswerSchema = new Schema<IAnswer>({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: Schema.Types.Mixed, required: true },
});

const ResponseSchema = new Schema<IResponse>({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submitted_at: { type: Date, required: true, default: Date.now },
    answers: [AnswerSchema],
});

export const Response = mongoose.model<IResponse>('Response', ResponseSchema);
