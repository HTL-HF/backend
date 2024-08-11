import express, { json } from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(loggerMiddleware);
app.use(json());
app.use(errorMiddleware);
app.listen(port, () => console.log("server is running on port " + port));
