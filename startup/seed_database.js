const movieRepository = require("../app/movies/movie_repository");
const moviesData = require("../util/movies");
async function loadMovies() {
  const movies = await movieRepository.all();
  console.log("Size of movies ", movies.length);
  if (movies.length === 0) {
    const preparedMovies = moviesData["movies"]
      .filter((movie) => !!movie["posterUrl"])
      .map((movie) => {
        return {
          title: movie.title,
          year: movie.year,
          runtime: movie.runtime,
          posterUrl: movie.posterUrl,
          genres: movie.genres,
          synopsis: movie.plot,
        };
      });
    movieRepository.massInsert(preparedMovies);
  }
}

module.exports = {loadMovies};
