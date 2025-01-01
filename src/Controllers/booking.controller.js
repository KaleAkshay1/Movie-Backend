import jwt from "jsonwebtoken";
import Booking from "../Model/booking.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponce from "../Utils/ApiResponce.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const bookSeat = asyncHandler(async (req, res) => {
  const { slot_id, seats } = req.body;
  if (!slot_id || !seats) {
    throw new ApiError(400, "Slot id and seats are required");
  }
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  const verify = await jwt.verify(token, process.env.JWT_SECRATE);
  const data = await Booking.findOne({ slot_id, user_id: verify.id });
  if (data) {
    const seatsArray = JSON.parse(seats);
    console.log(seats);
    const result = seatsArray.map((ele) => {
      data.seats.forEach((seat, ind) => {
        if (data.seats[ind].package === ele.package) {
          data.seats[ind].seat_numbers = seat.seat_numbers.concat(
            ele.seat_numbers
          );
        }
      });
    });
    data.save();
    return res.status(200).json(new ApiResponce(200, data, "Booking updated"));
  }

  const booking = await Booking.create({
    slot_id,
    seats: JSON.parse(seats),
    user_id: verify.id,
  });
  if (!booking) {
    throw new ApiError(400, "Booking failed");
  }
  res.status(201).json(new ApiResponce(201, booking, "Booking successful"));
});

const getBookingSeats = asyncHandler(async (req, res) => {
  const { slot_id } = req.params;
  if (!slot_id) {
    throw new ApiError(400, "Slot id is required");
  }
  const booking = await Booking.find({ slot_id });
  if (!booking) {
    throw new ApiError(404, "No booking found");
  }
  const data = booking
    .flatMap((book) => {
      return book.seats.map((ele) => ({
        seat_numbers: ele.seat_numbers,
        package: ele.package,
      }));
    })
    .reduce((acc, ele) => {
      acc[ele.package] = acc[ele.package]
        ? acc[ele.package].concat(ele.seat_numbers)
        : ele.seat_numbers;
      return acc;
    }, {});
  res.status(200).json(new ApiResponce(200, data, "Booking found"));
});

const sendTicket = asyncHandler(async (req, res) => {
  const token = req.cookies?.accessToken;
  const verify = await jwt.verify(token, process.env.JWT_SECRATE);
  const booking = await Booking.find({ user_id: verify.id }).populate({
    path: "slot_id",
    select: "movie slot_date slot_time -_id ",
    populate: {
      path: "movie",
      select: "title poster_url rating -_id",
    },
  });
  if (booking.length === 0) {
    throw new ApiError(404, "No booking found");
  }
  res.status(200).json(new ApiResponce(200, booking, "Booking found"));
});

export { bookSeat, getBookingSeats, sendTicket };
