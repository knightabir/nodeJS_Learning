import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// this middleware is used to enable cors
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

// This middleware is used to parse cookies
app.use(express.json({
    limit:"16kb"
}));

// This middleware is used to parse the url encoded data
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}));

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json(err.toJSON());
    } else {
        // Handle unknown errors
        console.error(err);
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
            success: false
        });
    }
});

// this middleware us used to store assets in public folder
app.use(express.static("public"));

// This middleware is used to parse cookies
app.use(cookieParser());

// Routes => all the routes are stored in this file
import userRouter from "./routes/user.router.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
export default app;