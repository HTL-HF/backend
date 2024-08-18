import { Router } from "express";
import {
  getUserFormsHandler,
  loginHandler,
  registerHandler,
} from "../controllers/users.controller";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";

const usersRouter = Router();

usersRouter.post("/register", registerHandler);
usersRouter.post("/login", loginHandler);
usersRouter.get("/forms", verifyTokenMiddleware).use(getUserFormsHandler);
export default usersRouter;
