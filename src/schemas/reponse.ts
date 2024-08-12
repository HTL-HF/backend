import mongoose, { Schema, Document } from 'mongoose';

interface IAnswer extends Document {
    question_id: mongoose.Types.ObjectId;
    answer: string | number;
}

interface IResponse extends Document {
    form_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    submitted_at: Date;
    answers: IAnswer[];
}

const AnswerSchema = new Schema<IAnswer>({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: Schema.Types.Mixed, required: true },
});

const ResponseSchema = new Schema<IResponse>({
    form_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submitted_at: { type: Date, required: true, default: Date.now },
    answers: [AnswerSchema],
});

export const Response = mongoose.model<IResponse>('Response', ResponseSchema);
