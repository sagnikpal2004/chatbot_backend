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

app.use("/auth", authRouter);

app.listen(PORT);