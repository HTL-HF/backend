import express, { json } from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import expressWinston from "express-winston";
import { transports } from "../configs/logger";
import winston from "winston";
import mongoose from "mongoose";
import configs from "../configs/mongoConfigs";
import User from "./schemas/user";

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

const url = `mongodb://${configs.CREDENTIALS}${configs.IP}/${configs.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(url, { autoCreate: true })
  .then(() => {
    console.log("connected to DB");
  })
  .catch((error) => console.error("Error connecting to DB:", error));

app.listen(port, () => console.log("server is running on port " + port));
