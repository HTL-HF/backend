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

formsRouter.post("/", verifyTokenMiddleware, addFormHandler);
formsRouter.delete("/:id", verifyTokenMiddleware, deleteFormHandler);
formsRouter.get(
  "/:formId/responses",
  verifyTokenMiddleware,
  getResponsesHandler
);
formsRouter.delete(
  "/:formId/responses/:id",
  verifyTokenMiddleware,
  removeResponseHandler
);

export default formsRouter;
