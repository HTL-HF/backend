import { Responses, ResponseSchema } from "../schemas/response.schema";
import { ResponseDTO } from "../types/dtos/responses.dto";

export const findFormResponsesById = async (formId: string) => {
  return await Responses.find({ formId });
};

export const deleteResponse = async (id: string) => {
  return await Responses.findByIdAndDelete(id);
};

export const createResponse = async (response: ResponseDTO) => {
  return await Responses.create(response);
};

export const findResponseById = async (responseId:string) => {
    return await Responses.findById(responseId);
}