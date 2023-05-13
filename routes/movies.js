const Router = require("express").Router;
const router = Router();
const movie_validator = require("../app/movies/movie_validator");
const movie_controller = require("../app/movies/movie_controller");
router.post("/add", movie_validator.addMovie, movie_controller.addMovie);
router.post("/list", movie_validator.listMovies, movie_controller.listMovies);
router.post("/rank", movie_validator.rankMovie, movie_controller.rankMovie);
module.exports = router;