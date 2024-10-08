import mongoose from "mongoose";

const configs = {
  IP: process.env.DB_IP || "localhost",
  PORT: process.env.DB_PORT || "27017",
  DB_NAME: process.env.DB_NAME || "forms",
  CREDENTIALS:
    process.env.DB_USERNAME && process.env.DB_PASSWORD
      ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
      : "",
};

const url = `mongodb://${configs.CREDENTIALS}${configs.IP}/${configs.DB_NAME}?retryWrites=true&w=majority`;

const connect = (connectedFunction: () => void) => {
  mongoose
    .connect(url, { autoCreate: true })
    .then(connectedFunction)
    .catch((error) => console.error("Error connecting to DB:", error));
};

export default connect;
