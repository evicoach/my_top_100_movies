const Router = require("express").Router;
const router = Router();
const movie_validator = require("../app/movies/movie_validator");
const movie_controller = require("../app/movies/movie_controller");
const auth_validator = require("../app/auth/auth_validator");
router.post(
  "/",
  auth_validator.authenticate,
  movie_validator.addMovie,
  movie_controller.addMovie
);
router.get(
  "/",
  auth_validator.authenticate,
  movie_validator.listMovies,
  movie_controller.listMovies
);
router.put(
  "/rank",
  auth_validator.authenticate,
  movie_validator.rankMovie,
  movie_controller.rankMovie
);
module.exports = router;
