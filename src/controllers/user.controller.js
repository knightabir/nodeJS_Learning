import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import JWt from "jsonwebtoken";

const generateRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal server error. Please contact Admin.");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar,
    coverImage: coverImage || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email are required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await existingUser.isPasswordCorrect(password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  let accessToken, refreshToken;

  try {
    const tokens = await generateRefreshToken(existingUser._id);
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
  } catch (error) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  const options = {
    secure: true,
    httpOnly: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res)=>{
  const incomingRefreshToken  = req.cookies?.refreshToken || req.body?.refreshToken

  if(!incomingRefreshToken){
    throw new ApiError(401, "Unauthorized request. Please login again")
  }
  const decodedToken = JWt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  )

  const user = await User.findById(decodedToken?._id)

  if(!user){
    throw new ApiError(401, "Unauthorized request. Please login again")
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Unauthorized request. Please login again")
  }

  const options ={
    httpOnly:true,
    secure:true
  }

  const {accessToken, refreshToken} = await generateRefreshToken(user._id)

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new ApiResponse(200, {accessToken, refreshToken}, "Access token refreshed successfully"))

})

export { registerUser, loginUser, logOutUser };
