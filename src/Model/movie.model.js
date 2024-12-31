import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    movie_id: {
      type: Number,
      require: true,
    },
    poster_url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = model("Movie", movieSchema);
export default Movie;
