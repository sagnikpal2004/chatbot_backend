import express from "express";
import {
    queryRouter,
} from "../controllers/router.js";

const router = express.Router();

router.post("/", queryRouter);

export default router;