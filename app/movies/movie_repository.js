const Repository = require("../../database/repository");
const Movie = require("./movie_model");
class MovieRepository extends Repository {
  constructor() {
    super(Movie);
  }
}
module.exports = new MovieRepository();