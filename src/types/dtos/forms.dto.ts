import { FormModel } from "../interfaces/forms.interface";

export type RequestForm = Omit<FormModel, "_id" | "userId"> & {userId:string};
export type ResponseForm = RequestForm & { id: string };
