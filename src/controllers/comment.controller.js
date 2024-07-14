import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  // TODO: get all comments based on query, sort, pagination
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;
  // TODO: add comment
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  // TODO: update comment
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  // TODO: delete comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
