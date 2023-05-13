jest.mock("../app/movies/movie_repository");
const movieRepository = require("../app/movies/movie_repository");
const movieService = require("../app/movies/movie_service");

describe("Movie Service", () => {
  it("it should add a new movie", async () => {
    const movie = {
      title: "The first movie",
      posterUrl: "https://images-na.ssl-images-amazon.com",
      runtime: 120,
      year: 2004,
    };
    await movieService.addMovie(movie);
    expect(movieRepository.create).toBeCalled();
  });

  it("it should complain about duplicate movie", async () => {
    movieRepository.findOne = jest
      .fn()
      .mockReturnValue({ title: "The first movie", year: 2004 });
    const movie = {
      title: "The first movie",
      posterUrl: "https://images-na.ssl-images-amazon.com",
      runtime: 120,
      year: 2004,
    };
    const { error } = await movieService.addMovie(movie);
    expect(error).toBe(
      `Movie with title '${movie.title}', released in ${movie.year} already exists.`
    );
  });

  it("it should list all movies", async () => {
    movieRepository.paginate = jest.fn().mockReturnValue([]);
    const movie = {
      title: "The first movie",
      posterUrl: "https://images-na.ssl-images-amazon.com",
      runtime: 120,
      year: 2004,
    };
    const { data } = await movieService.listMovies(movie, {});
    expect(data).toEqual([]);
  });
});
