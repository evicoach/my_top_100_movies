const { Http } = require("@status/codes");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config/constants");

async function login(req, res, next) {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
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
    console.log("Login validation error: ", err);
    next(err);
  }
}

async function signup(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required().min(6),
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
  } catch (err) {
    console.log("Auth validation error", err);
    next(err);
  }
  next();
}

async function authenticate(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(Http.Forbidden).json({
      error: "A token is required for authentication",
    });
  }
  try {
    const token = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
    console.log("User from token is ", decoded);
  } catch (err) {
    console.log("Token error: ", err);
    return res.status(Http.BadRequest).json({
      error: "Invalid token",
    });
  }
  next();
}

module.exports = {
  login,
  authenticate,
  signup,
};
