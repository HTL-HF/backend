import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";
import {
  removeResponseHandler,
  getResponsesHandler,
  saveResponseHandler,
} from "../controllers/responses.controller";
const responsesRouter = Router({mergeParams:true});

responsesRouter.get("/", verifyTokenMiddleware, getResponsesHandler);
responsesRouter.delete("/:id", verifyTokenMiddleware, removeResponseHandler);
responsesRouter.post("/", saveResponseHandler);

export default responsesRouter;
