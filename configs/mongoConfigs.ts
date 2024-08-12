const configs = {
  IP: process.env.DB_IP || "localhost",
  PORT: process.env.DB_PORT || "27017",
  DB_NAME: process.env.DB_NAME || "forms",
  CREDENTIALS:
    process.env.USERNAME && process.env.PASSWORD
      ? `${process.env.USERNAME}:${process.env.PASSWORD}@`
      : "",
};

export default configs;
