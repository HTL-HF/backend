import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.post("/register",registerHandler);
usersRouter.post("/login",loginHandler);

export default usersRouter