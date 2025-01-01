import Slot from "../Model/slots.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponce from "../Utils/ApiResponce.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const accessBySlot = asyncHandler(async (req, res) => {
  const { skip, limit } = req.query;
  if (!skip || !limit) {
    throw new ApiError(400, "skip and limit require");
  }
  const slots = await Slot.find().populate("movie");
  const movies = slots.map((slot) => slot.movie);
  res
    .status(200)
    .json(new ApiResponce(200, movies, "movies fetch successfully"));
});

const accessBySlotAndDate = asyncHandler(async (req, res) => {
  const { date } = req.body;
  if (!date) {
    throw new ApiError(400, "date is require");
  }
  const slots = await Slot.find({ slot_date: date }).populate("movie");
  const movies = slots.map((slot) => slot.movie);
  res
    .status(200)
    .json(new ApiResponce(200, movies, "movies fetch successfully"));
});

const accessMovieDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "id is require");
  }
  const slot = await Slot.find({ movie: id }).populate("movie");
  const details = {
    id: slot[0].movie._id,
    title: slot[0].movie.title,
    poster_url: slot[0].movie.poster_url,
    description: slot[0].movie.description,
    rating: slot[0].movie.rating,
    slots: slot.map((ele) => ({
      id: ele._id,
      slot_date: ele.slot_date,
      slot_time: ele.slot_time,
    })),
  };
  res
    .status(200)
    .json(new ApiResponce(200, details, "movie fetch successfully"));
});

const accessDate = asyncHandler(async (req, res) => {
  const slots = await Slot.find().distinct("slot_date");
  res.status(200).json(new ApiResponce(200, slots, "date fetch successfully"));
});

export { accessBySlot, accessBySlotAndDate, accessDate, accessMovieDetails };
