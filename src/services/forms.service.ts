import ForbiddenError from "../errors/ForbiddenError";
import NotAcceptableError from "../errors/NotAcceptableError";
import NotFoundError from "../errors/NotFoundError";
import {
  createForm,
  deleteFormById,
  findUserForms,
  findFormById,
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

export const isOwner = async (formId: string, userId: string) => {
  const form = await getFormById(formId);

  if (form.userId.toString() !== userId) {
    throw new ForbiddenError(`${userId} doesnt have access for ${formId}`);
  }
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
) => {
  const createdForm = await createForm({ ...form, userId: user.id });

  return createdForm.toObject();
};

export const getFormById = async (formId: string) => {
  const form = await findFormById(formId);

  if (!form) {
    throw new NotFoundError(`Form with id: ${formId} not found`);
  }

  const formObject = form.toObject();

  return {
    ...formObject,
    id: formObject._id,
    questions: formObject.questions.map((question) => {
      return { ...question, id: question._id.toString() };
    }),
  };
};
