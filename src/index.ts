import express, { json } from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import expressWinston from "express-winston";
import { transports } from "../configs/logger";
import winston from "winston";
import ConflictError from "./errors/ConflictError";
const app = express();
const port = process.env.PORT || 3000;

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
app.use(errorMiddleware);
app.listen(port, () => console.log("server is running on port " + port));
