import User from "../Model/user.model.js";
import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(404, "Unauthorize persone");
  }
  const result = await jwt.verify(token, process.env.JWT_SECRATE);
  if (!result) {
    throw new ApiError(400, "Unauthorize persone");
  }
  const user = await User.findById(result.id);

  if (!user) {
    throw new ApiError(400, "Invalid User");
  }

  next();
});

export default authUser;
