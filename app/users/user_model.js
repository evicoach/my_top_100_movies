const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    topHundredMovies: {
      type: Array,
      default: [],
    },
    meta: {
      type: Object,
    },
  },
  {
    strictQuery: false,
    strict: true,
    toObject: {
      transform: function (doc, ret) {
        ret.userId = ret._id;
      },
    },
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model("User", User);
