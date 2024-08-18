import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";
import {
  addFormHandler,
  deleteFormHandler,
} from "../controllers/forms.controller";

const formsRouter = Router();

formsRouter.use(verifyTokenMiddleware);

formsRouter.post("/", addFormHandler);
formsRouter.delete("/:id", deleteFormHandler);

export default formsRouter;