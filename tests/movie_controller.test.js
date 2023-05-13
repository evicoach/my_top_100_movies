const movieService = require("../app/movies/movie_service");
const movieController = require("../app/movies/movie_controller");
describe("Movie Controller", () => {
  it("it should call movieService.addMovie with the right payload", async () => {
    jest.mock;
    const req = {
      body: {
        title: "The first movie",
        posterUrl: "https://images-na.ssl-images-amazon.com/images",
        runtime: 120,
        year: 2004,
      },
      user: {
        username: "user@email.com",
      },
    };
    const res = {
      json: jest.fn(),
    };

    const expectedMovie = {
      status: true,
      message: "Movie added successfully",
      error: false,
      data: {
        id: "new-movie-id",
        title: "The first movie",
        posterUrl: "https://images-na.ssl-images-amazon.com/images",
        runtime: 120,
        year: 2004,
      },
    };
    movieService.addMovie = jest.fn().mockResolvedValue(expectedMovie);

    await movieController.addMovie(req, res);

    expect(movieService.addMovie).toBeCalled();
    expect(res.json).toBeCalled();
  });
});
