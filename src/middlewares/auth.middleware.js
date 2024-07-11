import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Token is required");
    }

    const decodedToken = JWt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          throw new ApiError(401, "Invalid token");
        }
        req.user = decoded;
        next();
      }
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid AccessToken");
  }
});
