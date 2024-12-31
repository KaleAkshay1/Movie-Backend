import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return null;
  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRATE, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.genrateRefreshToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRATE, {
    expiresIn: "15d",
  });
};

userSchema.methods.verifyAccessToken = async (token) => {
  const result = await jwt.verify(token, process.env.JWT_SECRATE);
  return result;
};

userSchema.methods.verifyRefreshToken = async (token) => {
  const result = await jwt.verify(token, process.env.JWT_SECRATE);
  return result;
};

const User = model("User", userSchema);

export default User;
