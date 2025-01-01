import cookieParsel from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({ origin: "*" }));
// app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParsel());

// app.get("/", async (req, res) => {
//   const url = "https://api.themoviedb.org/3/movie/now_playing?page=10";
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDZlZGZlMzJhZWUwMzNiZmEyZmExNDEyNmNkMmY4YyIsIm5iZiI6MTczNTU1MTQ0Ny43ODQsInN1YiI6IjY3NzI2OWQ3ZTljYWMwN2VjNDEyYjExYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.du-A3hmxewriWqRkb01gRNhNfdJNLxLl0ScH0xbQ42o",
//     },
//   };

//   const data2 = await fetch(url, options);
//   const data = await data2.json();
//   data.results.forEach(async (ele) => {
//     const obj = {
//       movie_id: ele.id,
//       title: ele.original_title,
//       poster_url: "https://image.tmdb.org/t/p/w500" + ele.poster_path,
//       description: ele.overview ? ele.overview : "null",
//       rating: ele.vote_average,
//     };
//     const user = await Movie.create(obj);
//   });
//   res.json(data);
// });

import user from "./Routes/user.route.js";
app.use("/api/user", user);

import movie from "./Routes/movie.route.js";
app.use("/api/movie", movie);

import admin from "./Routes/admin.route.js";
app.use("/api/admin", admin);

import booking from "./Routes/booking.route.js";
app.use("/api/booking", booking);

export default app;
