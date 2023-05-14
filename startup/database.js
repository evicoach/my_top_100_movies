"use strict";

const mongoose = require("mongoose");
const { loadMovies } = require("./seed_database");
const logger = require("../util/logger");
if (process.env.NODE_ENV == "development") mongoose.set("debug", true);

const mongodbUrl = `${process.env.MONGODB_URL}`;
logger.info(`MONGO_DB_FULL_URL ${mongodbUrl}`);
mongoose.set("strictQuery", false);
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on("connected", () => {
  logger.info("mongo db connected");
  loadMovies();
});

db.on("error", (error) => {
  logger.error(`An error occurred: ${error}`);
  process.exit(1);
});
