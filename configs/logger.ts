import winston from "winston";

export const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "./logs/logs.log" }),
];

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || "info",
  format: winston.format.json(),
  transports,
});

export default logger;
