import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import {
  createForm,
  deleteFormById,
  findUserForms,
  getFormById,
} from "../repositories/forms.repository";
import { RequestForm, ResponseForm } from "../types/dtos/forms.dto";
import { UserDTO } from "../types/dtos/users.dto";

export const getUserForms = async (user: UserDTO) => {
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

export const deleteForm = async (formId: string, user: UserDTO) => {
  const form = await getFormById(formId);
  if (form) {
    if (form.userId.toString() !== user.id) {
      throw new ForbiddenError("your not authorized to delete this form");
    }
  } else {
    throw new NotFoundError("");
  }

  const deletedForm = await deleteFormById(formId);
  return deletedForm;
};

export const addForm = async (
  form: RequestForm,
  user: UserDTO
): Promise<ResponseForm> => {

  const createdForm = await createForm({ ...form, userId: user.id });
  
  return createdForm.toObject();
};
