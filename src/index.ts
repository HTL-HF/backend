import express, { json } from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import expressWinston from "express-winston";
import { transports } from "../configs/logger";
import winston from "winston";
import connect from "../configs/mongoConnection";
import usersRouter from "./routes/users.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import verifyTokenMiddleware from "./middlewares/verifyTokenMiddleware";
import formsRouter from "./routes/forms.routes";

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = `http://${process.env.FRONTEND_IP || "localhost"}:${
  process.env.FRONTEND_PORT || 5173
}`;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  expressWinston.logger({
    transports,
    format: winston.format.combine(winston.format.json()),
    msg: "{{req.method}} {{req.url}} {{req.ip}} {{res.statusCode}}",
    meta: false,
    expressFormat: true,
  })
);

app.use(json());
app.use(cookieParser());

app.get("/", verifyTokenMiddleware);
app.use("/users", usersRouter);
app.use("/forms", formsRouter);

app.use(errorMiddleware);

connect(() => console.log("connected to DB"));
app.listen(PORT, () => console.log("server is running on port " + PORT));
