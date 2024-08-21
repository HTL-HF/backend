import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";
import {
  addFormHandler,
  deleteFormHandler,
  getFormByIdHandler,
} from "../controllers/forms.controller";

const formsRouter = Router();

formsRouter.post("/", addFormHandler).use(verifyTokenMiddleware);
formsRouter.delete("/:id", deleteFormHandler).use(verifyTokenMiddleware);
formsRouter.get("/:id",getFormByIdHandler);

export default formsRouter;