import express from "express";
import {
  accessMovies,
  createSlot,
  getSlots,
} from "../Controllers/admin.controller.js";
import checkAdmin from "../Middelware/admin.middelware.js";
import authUser from "../Middelware/auth.middelware.js";

const admin = express.Router();

admin.get("/access-movies", authUser, checkAdmin, accessMovies);
admin.post("/create-slot/:id", authUser, checkAdmin, createSlot);
admin.get("/get-slots/:id", authUser, checkAdmin, getSlots);

export default admin;
