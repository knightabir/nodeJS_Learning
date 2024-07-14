import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Playlist} from "../models/playlist.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const playlist = await Playlist.create({ title, description });
    return res
        .status(201)
        .json(new ApiResponse(201, playlist, "Playlist created successfully"));

});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const getUserPlayLists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const playlists = await Playlist.find({ owner: userId });
    return res
        .status(200)
        .json(new ApiResponse(200, playlists, "Playlists fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.body;
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist or video id");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    const video = await Playlist.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    playlist.videos.push(videoId);
    await playlist.save();
    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video added to playlist successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.body;
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist or video id");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    const video = await Playlist.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    const videoIndex = playlist.videos.indexOf(videoId);
    if (videoIndex === -1) {
        throw new ApiError(404, "Video not found in playlist");
    }
    playlist.videos.splice(videoIndex, 1);
    await playlist.save();
    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }
    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }
    const playlist = await Playlist.findByIdAndUpdate(playlistId, req.body, {
        new: true,
    });
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
    createPlaylist,
    getPlaylistById,
    getUserPlayLists,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
}