import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { subscriberId, subscribedToId } = req.body;

  if (!isValidObjectId(subscriberId) || !isValidObjectId(subscribedToId)) {
    throw new ApiError(400, "Invalid user id");
  }

  const subscription = await Subscription.findOne({
    subscriber: subscriberId,
    subscribedTo: subscribedToId,
  });
  if (subscription) {
    await Subscription.findByIdAndDelete(subscription._id);
  } else {
    const newSubscription = new Subscription({
      subscriber: subscriberId,
      subscribedTo: subscribedToId,
    });
    await newSubscription.save();
  }

  const user = await User.findById(subscriberId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const subscribedTo = await User.findById(subscribedToId);
  if (!subscribedTo) {
    throw new ApiError(404, "User not found");
  }

  const subscriptions = await Subscription.find({
    subscribedTo: subscribedToId,
  });
  const subscriptionCount = subscriptions.length;
  user.subscriptionCount = subscriptionCount;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subscription toggled successfully"));
});

// Controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const subscribers = await Subscription.find({ subscribedTo: channelId });
  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  const subscriptions = await Subscription.find({ subscriber: subscriberId });
  const subscribedChannels = subscriptions.map(
    (subscription) => subscription.subscribedTo
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed channels fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
