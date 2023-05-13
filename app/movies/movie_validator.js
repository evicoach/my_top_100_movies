const { Http } = require("@status/codes");
const Joi = require("joi");
async function addMovie(req, res, next) {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      year: Joi.string().required(),
      posterUrl: Joi.string().required(),
      runtime: Joi.number().required(),
      genre: Joi.array().optional(),
    });

    const value = schema.validate(req.body, { abortEarly: false });
    if (value && value.error) {
      const errors = value.error.details.map((detail) => {
        return {
          key: detail.path[0],
          message: detail.message.replace(/['"]/g, ""),
        };
      });
      return res.status(Http.BadRequest).json(errors);
    }
    next();
  } catch (err) {
    console.log("Add movie validation error: ", err);
    next(err);
  }
}

async function listMovies(req, res, next) {
  try {
    const schema = Joi.object({
      limit: Joi.number().optional(),
      skip: Joi.number().optional(),
      recent: Joi.boolean().optional(),
      pageNo: Joi.number().optional(),
    });

    const value = schema.validate(req.body, { abortEarly: false });
    if (value && value.error) {
      const errors = value.error.details.map((detail) => {
        return {
          key: detail.path[0],
          message: detail.message.replace(/['"]/g, ""),
        };
      });
      return res.status(Http.BadRequest).json(errors);
    }
    next();
  } catch (err) {
    console.log("Rank movie validation error: ", err);
    next(err);
  }
}

async function rankMovie(req, res, next) {
  try {
    const schema = Joi.object({
      movieId: Joi.string().required(),
      rank: Joi.number().min(1).max(100).required(),
    });

    const value = schema.validate(req.body, { abortEarly: false });
    if (value && value.error) {
      const errors = value.error.details.map((detail) => {
        return {
          key: detail.path[0],
          message: detail.message.replace(/['"]/g, ""),
        };
      });
      return res.status(Http.BadRequest).json(errors);
    }
    next();
  } catch (err) {
    console.log("Rank movie validation error: ", err);
    next(err);
  }
}

module.exports = {
  addMovie,
  rankMovie,
  listMovies,
};
