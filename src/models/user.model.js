import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //ccloudnary url
            required: true
        },
        coverImage:{
            type: String, //ccloudnary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true, "Please provide a password"],
            minlength: 8
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Checks if the provided password matches the hashed password in the database.
 *
 * @param {string} password - The password to be compared.
 * @return {Promise<boolean>} A promise that resolves to true if the password matches,
 *                            false otherwise.
 */
userSchema.methods.isPasswordCorrect = async function(password) {
    // Use bcrypt's compare method to compare the provided password with the hashed password in the database.
    // The compare method takes in two parameters: the password to be compared and the hashed password.
    // It returns a promise that resolves to true if the passwords match, false otherwise.
    return await bcrypt.compare(password, this.password);
}

    /**
     * Generates an access token for the user.
     *
     * @return {string} The generated access token.
     */
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({_id: this._id, username: this.username, email: this.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

    /**
     * Generates a refresh token for the user.
     *
     * @return {string} The generated refresh token.
     */
userSchema.methods.generateRefreshToken = function() {
    // Use jwt.sign method to generate a refresh token.
    // The method takes in three parameters: the payload, the secret key, and the expiration time.
    // The payload is an object that contains the user's id.
    // The secret key is stored in the environment variable REFRESH_TOKEN_SECRET.
    // The expiration time is stored in the environment variable REFRESH_TOKEN_EXPIRY.
    // The method returns a promise that resolves to the generated refresh token.
    return jwt.sign({_id: this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}

export const User = mongoose.model("User", userSchema)