import NotAcceptableError from "../errors/NotAcceptableError";
import { getFormById } from "../services/forms.service";
import { RequestForm, ResponseQuestion } from "../types/dtos/forms.dto";
import { AnswerDTO, ResponseDTO } from "../types/dtos/responses.dto";

const optionsRequiredViewTypes = ["DROPDOWN", "CHECKBOX", "RADIO", "LINEAR"];
const typeAllowsNumber = ["SHORT", "LONG", "LINEAR"];

const validateOptionsType = (options: any[] | undefined, viewType: string) => {
  if (viewType === "LINEAR") {
    if (
      !Array.isArray(options) ||
      !options.every((opt) => typeof opt === "number") ||
      !options.every((opt, i, arr) => i === 0 || opt === arr[i - 1] + 1)
    ) {
      throw new NotAcceptableError(
        "LINEAR type options must be continuous numbers (e.g., 1, 2, 3, 4)."
      );
    }
  } else {
    if (
      !Array.isArray(options) ||
      !options.every((opt) => typeof opt === "string")
    ) {
      throw new NotAcceptableError(`${viewType} type options must be strings.`);
    }
  }
};

const validateOptionsPresence = (
  options: any[] | undefined,
  viewType: string
) => {
  if (
    (Array.isArray(options) && !optionsRequiredViewTypes.includes(viewType)) ||
    (!Array.isArray(options) && optionsRequiredViewTypes.includes(viewType))
  ) {
    throw new NotAcceptableError(
      `Options can only exist for view types: ${optionsRequiredViewTypes.join(
        ", "
      )}, and must exist for those view types.`
    );
  }
};

const validateQuestionType = (type: string, viewType: string) => {
  if (type === "number" && !typeAllowsNumber.includes(viewType)) {
    throw new NotAcceptableError(
      `Type 'number' is only allowed for view types: ${typeAllowsNumber.join(
        ", "
      )}.`
    );
  }
};

export const validateForm = (form: RequestForm) => {
  form.questions.forEach(({ options, viewType, type }) => {
    validateOptionsPresence(options, viewType);
    validateQuestionType(type, viewType);
    if (optionsRequiredViewTypes.includes(viewType)) {
      validateOptionsType(options, viewType);
    }
  });
};

export const verifyResponseValidity = async (
  response: Omit<ResponseDTO, "id" | "formId">,
  formId: string
) => {
  const questions = (await getFormById(formId)).questions;

  for (const question of questions) {
    const answer = response.answers.find(
      (answer) => answer.questionId === question.id.toString()
    );

    if (!answer) {
      if (question.required)
        throw new NotAcceptableError(
          `question ${question.id} is required but was not answered`
        );
    } else {
      assertTypes(question, answer);
      assertOptions(question, answer);
    }
  }
};

const assertTypes = (question: ResponseQuestion, answer: AnswerDTO) => {
  if (
    question.type !== typeof answer.answer &&
    !(
      Array.isArray(answer.answer) &&
      answer.answer.every((answer) => typeof answer === typeof question.type)
    )
  ) {
    throw new NotAcceptableError(
      `question ${question.id} is of type ${
        question.type
      } and answer is of type ${
        Array.isArray(answer.answer)
          ? typeof answer.answer[0]
          : typeof answer.answer
      } `
    );
  }
};

const assertOptions = (question: ResponseQuestion, answer: AnswerDTO) => {
  if (!question.options) return;

  const { viewType } = question;
  const { answer: ans } = answer;

  if (viewType === "CHECKBOX") {
    if (
      !Array.isArray(ans) ||
      !ans.every((item) => question.options!.includes(item))
    ) {
      throw new NotAcceptableError(
        `Your answer must be an array and part of the available options for question ${question.id}`
      );
    }
  } else if (Array.isArray(ans) || !question.options.includes(ans)) {
    throw new NotAcceptableError(
      `Your answer must be a single value and part of the available options for question ${question.id}`
    );
  }
};
