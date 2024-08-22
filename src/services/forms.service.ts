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
import { inArray } from "../utils/array.utils";
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

export const isOwner = async (formId: string, userId: string) => {
  const form = await getFormById(formId);

  if (form.userId.toString() !== userId) {
    throw new ForbiddenError(`${userId} doesnt have access for ${formId}`);
  }
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

  for (const question of form.questions) {
    if (
      inArray(["DROPDOWN", "CHECKBOX", "RADIO", "LINEAR"], question.viewType) &&
      Array.isArray(question.options )
    ) {
      throw new NotAcceptableError(
        "Cant have options for non optional view type"
      );
    }
  }

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
