const { Http } = require("@status/codes");
const movieService = require("./movie_service");
async function addMovie(req, res) {
  const { data, error } = await movieService.addMovie(req.body);
  if (error) {
    return res.status(Http.BadRequest).json({
      status: false,
      message: error,
    });
  }
  return res.json({
    status: true,
    message: "Movie added successfully",
    data: data,
  });
}

async function listMovies(req, res, next) {
  const { limit, skip, recent, pageNo, ...payload } = req.query;

  const { data, error } = await movieService.listMovies(payload, req.query);
  if (error) {
    return res.status(Http.BadRequest).json({
      status: false,
      message: error,
    });
  }
  return res.json({
    status: true,
    message: "Movie fetched successfully",
    data: data,
  });
}

async function rankMovie(req, res) {
  const payload = {
    ...req.body,
    user: req.user,
  };
  const { data, error } = await movieService.rankMovie(payload);
  if (error) {
    return res.status(Http.BadRequest).json({
      status: false,
      message: error,
    });
  }
  return res.json({
    status: true,
    message: "Movie ranked successfully",
    data: data,
  });
}

module.exports = {
  addMovie,
  listMovies,
  rankMovie,
};
