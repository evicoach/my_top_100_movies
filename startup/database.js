"use strict";

const mongoose = require("mongoose");
const { loadMovies } = require("./seed_database");
if (process.env.NODE_ENV == "development") mongoose.set("debug", true);

const mongodbUrl = `${process.env.MONGODB_URL}`;
console.log("MONGO_DB_FULL_URL", mongodbUrl);
mongoose.set('strictQuery', false);
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on("connected", () => {
  console.log("mongo db connected");
  loadMovies()
});

db.on("error", (error) => {
//   console.error("An error occurred", JSON.stringify(error));
  console.error("An error occurred", error);
  process.exit(1);
});
