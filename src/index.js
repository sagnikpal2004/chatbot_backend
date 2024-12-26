import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.sendStatus(200);
});

import authRouter from "./routes/auth";

app.use("/auth", authRouter);

app.listen(3000);