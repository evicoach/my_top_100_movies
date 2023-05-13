const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./util/logger");
const expressWisten = require("express-winston");
dotenv.config({path: path.join(__dirname, '.env')});
const { Http } = require("@status/codes");
const { transport, transports, format } = require("winston");
const { failureResponse } = require("./util/util");
require("./startup");
require("winston-mongodb");
const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(
  expressWisten.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", require("./routes"));
app.use((req, res, next) => {
  console.error("Route not found");
  res.status(Http.NotFound).json({ error: "Route Not found" });
});
app.use((err, req, res, next) => {
  if (err) {
    console.error("An error occurred ", err);
    failureResponse(res, {
      message: "Internal server error",
      statusCode: Http.InternalServerError,
      status: err.status ?? "error",
    });
  }
});

const logFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});
app.use(
  expressWisten.errorLogger({
    transports: [
      new transports.File({
        level: "error",
        filename: "logsInternalErrors.log",
      }),
    ],
    format: format.combine(format.json(), format.timestamp()),
  })
);

module.exports = app;
