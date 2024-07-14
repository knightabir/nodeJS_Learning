import mongoose, { isValidObjectId } from "mongoose";
import {Like} from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video id");
    }
    const like = await Like.findOne({video:videoId, user:req.user._id});
    if(like){
        await Like.findByIdAndDelete(like._id);
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Video unliked successfully"));
    }
})

const toggleCommentLike = asyncHandler(async(req,res)=>{
    const {commentId} = req.params;
    if(!isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid comment id");
    }
    const like = await Like.findOne({comment:commentId, user:req.user._id});
    if(like){
        await Like.findByIdAndDelete(like._id);
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Comment unliked successfully"));
    }
})

const toggleTweetLike = asyncHandler(async(req,res)=>{
    const {tweetId} = req.params;
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400,"Invalid tweet id");
    }
    const like = await Like.findOne({tweet:tweetId, user:req.user._id});
    if(like){
        await Like.findByIdAndDelete(like._id);
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Tweet unliked successfully"));
    }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    // TODO: get all videos based on query, sort, pagination

});

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
}