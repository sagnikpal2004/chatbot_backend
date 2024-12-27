import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI);

import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_, res) => {
    res.sendStatus(200);
});

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js"

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});