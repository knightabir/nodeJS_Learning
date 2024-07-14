import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import {Subscription} from "../models/subscription.model.js"
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelState = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    // TODO: get all videos based on query, sort, pagination
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    // TODO: get all videos based on query, sort, pagination
})

export { getChannelState, getChannelVideos }