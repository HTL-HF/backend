import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import {
  createForm,
  deleteFormById,
  findUserForms,
  getFormById,
} from "../repositories/forms.repository";
import { RequestForm, ResponseForm } from "../types/dtos/forms.dto";
import { getUserFromToken } from "../utils/jwt.utils";

export const getUserForms = async (token: string) => {
  const user = getUserFromToken(token);
  const forms = await findUserForms(user.id);
  if (!forms) {
    return [];
  }

  return forms.map((formDoc) => {
    const form = formDoc.toObject();
    const { _id, userId, ...rest } = form;
    return { ...rest, id: _id.toString() };
  });
};

export const deleteForm = async (formId: string, token: string) => {
  const user = await getUserFromToken(token);
  const form = await getFormById(formId);
  if (form) {
    if (form.userId.toString() !== user.id) {
      throw new ForbiddenError("your not authorized to delete this form");
    }
  } else {
    throw new NotFoundError("");
  }

  const deletedForm = await deleteFormById(formId);
  if (deletedForm) return deletedForm;
};

export const addForm = async (
  form: RequestForm,
  token: string
): Promise<ResponseForm> => {
  const user = getUserFromToken(token);

  const createdForm = await createForm({ ...form, userId: user.id });
  
  return createdForm.toObject();
};
