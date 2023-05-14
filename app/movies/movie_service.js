const logger = require("../../util/logger");
const userRepository = require("../users/user_repository");
const movieRepository = require("./movie_repository");
const { ObjectId } = require("mongoose").mongo;

async function addMovie(payload) {
  const { title, year } = payload;
  try {
    const movieExists = await movieRepository.findOne({
      $and: [{ title }, { year }],
    });
    if (movieExists) {
      return {
        error: `Movie with title '${title}', released in ${year} already exists.`,
      };
    }
    const data = await movieRepository.create(payload);
    return { data };
  } catch (err) {
    console.error("Error adding movie", err);
    return { error: "Error adding movie" };
  }
}

async function listMovies(data, query) {
  let { limit = 10, skip = 0, recent = false, pageNo = 1, ...payload } = query;
  query = {};
  if (limit) query.limit = limit;
  if (skip) query.skip = skip;
  if (pageNo && pageNo !== 0) query.pageNo = pageNo;
  if (recent) query.sort = { createdAt: 1 };
  try {
    const data = await movieRepository.paginate(payload, query);
    return { data };
  } catch (err) {
    logger.error(`Error getting movies: ${err}`);
    return { error: "Error getting movies" };
  }
}
async function rankMovie(payload) {
  try {
    const { rank, movieId, user } = payload;
    const foundUser = await userRepository.findOne({ email: user.username });
    if (!foundUser) {
      return { error: "This user does not exist." };
    }
    logger.info(`The found user is ${foundUser}`);
    const movie = await movieRepository.findById(new ObjectId(movieId));
    const userRankedMovie = await userRepository.findOne({
      topHundredMovies: { _id: new ObjectId(movieId) },
    });
    if (userRankedMovie) {
      await userRepository.deleteOne({
        topHundredMovies: new ObjectId(movieId),
      });
    }
    if (!movie) {
      return { error: `Movie with id ${movieId} does not exist.` };
    }
    movie.rank = rank;

    //   foundUser.topHundredMovies.push(movie);
    logger.info(`The new top hundred movies: ${foundUser.topHundredMovies}`);

    const updatedUser = await userRepository.update({
      _id: foundUser._id,

      $addToSet: { topHundredMovies: movie },
    });

    // return { data: await userRepository.findOne({ email: user.username }) };
    return { data: updatedUser.topHundredMovies };
  } catch (err) {
    console.error("Error ranking movie ", err);
    return { error: "Error ranking movie" };
  }
}

module.exports = {
  addMovie,
  listMovies,
  rankMovie,
};
