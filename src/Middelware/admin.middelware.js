import User from "../Model/user.model.js";
import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const checkAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  const verify = jwt.verify(token, process.env.JWT_SECRATE);
  const user = await User.findById(verify.id);
  if (user.role !== "admin") {
    throw new ApiError(401, "Unauthorized");
  }
  next();
});

export default checkAdmin;
