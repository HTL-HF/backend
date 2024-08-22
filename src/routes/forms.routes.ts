import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";
import {
  addFormHandler,
  deleteFormHandler,
  getFormByIdHandler,
} from "../controllers/forms.controller";
import {
  getResponsesHandler,
  removeResponseHandler,
  saveResponseHandler,
} from "../controllers/responses.controller";

const formsRouter = Router();

formsRouter.post("/:formId/responses", saveResponseHandler);
formsRouter.get("/:id", getFormByIdHandler);

formsRouter.post("/", addFormHandler).use(verifyTokenMiddleware);
formsRouter.delete("/:id", deleteFormHandler).use(verifyTokenMiddleware);
formsRouter
  .get("/:formId/responses", getResponsesHandler)
  .use(verifyTokenMiddleware);
formsRouter
  .delete("/:formId/responses/:id", removeResponseHandler)
  .use(verifyTokenMiddleware);
  
export default formsRouter;
