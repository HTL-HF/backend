import Forms from "../schemas/forms.schema";
import { RequestForm } from "../types/dtos/forms.dto";

export const findUserForms = async (userId: string) => {
  return await Forms.find({ userId });
};

export const deleteFormById = async (formId: string) => {
  return await Forms.findByIdAndDelete(formId);
};

export const createForm = async (form: RequestForm & { userId: string }) => {
  return await Forms.create({ ...form });
};

export const findFormById = async (formId: string) => {
  return await Forms.findById(formId);
};
