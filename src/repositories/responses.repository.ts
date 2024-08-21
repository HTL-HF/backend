import { Responses } from "../schemas/reponse.schema";
import { ResponseDTO } from "../types/dtos/responses.dto";

export const findFormResponsesById = async (formId: string) => {
  return await Responses.find({ formId });
};

export const deleteResponse = async (id: string) => {
  return await Responses.deleteOne({ id });
};

export const createResponse = async (response: ResponseDTO) => {
  return await Responses.create(response);
};
