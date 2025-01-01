import express from "express";
import {
  accessBySlot,
  accessBySlotAndDate,
  accessDate,
  accessMovieDetails,
} from "../Controllers/movie.controller.js";

const movie = express.Router();

movie.get("/get-movies", accessBySlot);
movie.post("/get-movies-by-date", accessBySlotAndDate);
movie.get("/get-movie-details/:id", accessMovieDetails);
movie.get("/get-date", accessDate);

export default movie;
