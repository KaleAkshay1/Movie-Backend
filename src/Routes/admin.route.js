import express from "express";
import authUser from "../Middelware/auth.middelware.js";
import { accessMovies, createSlot } from "../Controllers/admin.controller.js";
import checkAdmin from "../Middelware/admin.middelware.js";

const admin = express.Router();

admin.get("/access-movies", authUser, checkAdmin, accessMovies);
admin.post("/create-slot/:id", authUser, checkAdmin, createSlot);

export default admin;
