import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_, res) => {
    res.sendStatus(200);
});

import authRouter from "./routes/auth.js";
import chatsRouter from "./routes/chats.js";

app.use("/auth", authRouter);
app.use("/chats", chatsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});