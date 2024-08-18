import Forms from "../schemas/form.schema";
import { RequestForm } from "../types/dtos/forms.dto";

export const findUserForms = async (userId: string) => {
  return await Forms.find({ userId });
};

export const deleteFormById = async (formId: string) => {
  return await Forms.findByIdAndDelete(formId);
};

export const createForm = async (form: RequestForm) => {
  return await Forms.create({ ...form });
};

export const getFormById = async (formId: string) => {
  return await Forms.findById(formId);
};
