const { Http } = require("@status/codes");

function successResponse(
  res,
  { statusCode, status = "success", message, data }
) {
  const responseObj = {
    status,
    message,
  };
  if (data) {
    responseObj.data = data;
  }
  res.status(statusCode ?? Http.Ok).json(responseObj);
}

function failureResponse(
  res,
  { statusCode, status = "failed", message, error }
) {
  const responseObj = {
    status,
    message,
  };
  if (error) {
    responseObj.error = data;
  }
  res.status(statusCode ?? Http.BadRequest).json(responseObj);
}
const addMinutes = ({date = new Date(), minutes}) =>
  new Date(date.getTime() + minutes * 6000);

const normalizeSpaces = (name) => name.replace(" ", "-").toLowerCase();

module.exports = {
  successResponse,
  failureResponse,
  normalizeSpaces,
  addMinutes,
};
