import User from "../Model/user.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponce from "../Utils/ApiResponce.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const result = await User.create({ username, email, password });
  res
    .status(200)
    .json(
      new ApiResponce(200, { username }, `Thanks for Registration ${username}`)
    );
});

const loginUSer = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(
      400,
      username ? "password is require" : "username is require"
    );
  }
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) {
    throw new ApiError(400, `cannot find user with ${username}`);
  }
  const checkPassword = await user.isPasswordCorrect(password);
  console.log(checkPassword);
  if (!checkPassword) {
    throw new ApiError(400, "invalid password");
  }
  // const refreshToken = await user.genrateRefreshToken();
  // if (!refreshToken) {
  //   throw new ApiError(400, "refresh token is not genrated");
  // }
  const accessToken = await user.genrateAccessToken();
  if (!accessToken) {
    throw new ApiError(400, "access token is not genrated");
  }
  res
    .cookie("accessToken", accessToken)
    .status(200)
    .json(
      new ApiResponce(
        200,
        { username: user.username, email: user.email },
        `Login succesfull`
      )
    );
});

const logOut = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken")
    .status(200)
    .json(new ApiResponce(200, {}, "Logout Successfully"));
});

export { registerUser, loginUSer, logOut };
