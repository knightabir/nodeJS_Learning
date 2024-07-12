import mongoose, { Schema } from "mongoose";
import { type } from "os";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscribedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });



export const Subscription = mongoose.model("Subscription", subscriptionSchema)