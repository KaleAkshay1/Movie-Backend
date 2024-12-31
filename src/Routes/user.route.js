import express from "express";
import {
  loginUSer,
  logOut,
  registerUser,
} from "../Controllers/user.controller.js";
import authUser from "../Middelware/auth.middelware.js";

const user = express.Router();

user.post("/register", registerUser);
user.post("/login", loginUSer);
user.get("/logout", authUser, logOut);

export default user;
