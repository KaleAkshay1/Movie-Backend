import asyncHandler from "../Utils/AsyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import User from "../Model/user.model.js";
import Movie from "../Model/movie.model.js";
import jwt from "jsonwebtoken";
import ApiResponce from "../Utils/ApiResponce.js";
import Slot from "../Model/slots.model.js";

const accessMovies = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  const { skip, limit } = req.query;
  if (!skip || !limit) {
    throw new ApiError(400, "Please provide skip and limit");
  }
  const verify = jwt.verify(token, process.env.JWT_SECRATE);
  if (!verify) {
    throw new ApiError(401, "Unauthorized");
  }
  const user = await User.findById(verify.id);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  const movies = await Movie.find().limit(limit).skip(skip);
  if (!movies) {
    throw new ApiError(404, "No movies found");
  }
  res
    .status(200)
    .json(new ApiResponce(200, movies, "movies fetch successfully"));
});

const createSlot = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const { slot_time, slot_date } = req.body;
  if (!id || !slot_time || !slot_date) {
    throw new ApiError(
      400,
      id
        ? slot_date
          ? slot_time && "Plese provide slot time"
          : "Please provide date for slot"
        : "Please provide movie id"
    );
  }
  const token = req.cookies?.accessToken;
  const verify = jwt.verify(token, process.env.JWT_SECRATE);
  const movie = await Slot.create({
    movie_id: id,
    slot_time,
    slot_date,
    user_id: verify.id,
  });
  console.log("movie", movie);
  if (!movie) {
    throw new ApiError(400, "Failed to create slot");
  }
  res
    .status(201)
    .json(new ApiResponce(201, movie, "Slot created successfully"));
});

export { accessMovies, createSlot };
