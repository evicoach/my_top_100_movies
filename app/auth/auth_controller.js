const { Http } = require("@status/codes");
const { failureResponse, successResponse } = require("../../util/util");
const userService = require("../users/user_service");

async function signup(req, res) {
  const { data, error } = await userService.signup(req.body);
  if (error) {
    return failureResponse(res, {
      message: error,
      statusCode: Http.BadRequest,
    });
  }
  return successResponse(res, {
    message: "Signup success",
    data,
  });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const { data, error } = await userService.login(username, password);
  if (error) {
    return res.status(Http.BadRequest).json({
      status: false,
      message: error,
    });
  }
  return res.json({
    status: true,
    message: "Login success",
    data: data,
  });
}

module.exports = {
  signup,
  login,
};
