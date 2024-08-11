import winston from "winston";

const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL || "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "./logs/logs.log" }),
    ],
});

export default logger;
