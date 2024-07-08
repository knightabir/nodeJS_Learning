import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Registration Successful." });
});

const sampleGet = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Successful." });
});

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Login Successful." });
});

export {
     registerUser,
     sampleGet,
     loginUser
     }