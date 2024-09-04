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
import responsesRouter from "./responses.routes";

const formsRouter = Router();

formsRouter.get("/:id", getFormByIdHandler);

formsRouter.post("/", verifyTokenMiddleware, addFormHandler);
formsRouter.delete("/:id", verifyTokenMiddleware, deleteFormHandler);

formsRouter.use("/:formId/responses", responsesRouter);
export default formsRouter;
