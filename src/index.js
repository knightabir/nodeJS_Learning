import dotenv from "dotenv";
import express from "express";
// import mongoose from "mongoose";
import connectDB from "./db/index.js";

dotenv.config({
    path: "/.env"
});

print(process.env.MONGO_URI);
connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});