import mongoose, {isValidObjectId} from "mongoose";
import {Tweet} from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async(req,res)=>{
    const {text} = req.body;
});

const getUserTweets = asyncHandler(async(req,res)=>{
    const {page =1 , limit=10,query,sortBy,sortType,userId} = req.query
});

const UpdateTweet = asyncHandler(async(req,res)=>{
    const {tweetId} = req.params;
});

const deleteTweet = asyncHandler(async(req,res)=>{
    const {tweetId} = req.params;
});

export{
    createTweet,
    getUserTweets,
    UpdateTweet,
    deleteTweet
}