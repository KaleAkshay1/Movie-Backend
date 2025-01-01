import express from "express";
import {
  bookSeat,
  getBookingSeats,
  sendTicket,
} from "../Controllers/booking.controller.js";
import authUser from "../Middelware/auth.middelware.js";

const booking = express.Router();

booking.post("/book", authUser, bookSeat);
booking.get("/get-seats/:slot_id", authUser, getBookingSeats);
booking.get("/get-tickets", authUser, sendTicket);

export default booking;
