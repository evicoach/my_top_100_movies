const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    runtime: {
      type: Number,
    },
    genre: {
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

module.exports = mongoose.model("Movie", Movie);
