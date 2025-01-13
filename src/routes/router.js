import express from "express";
import {
    queryRouter,
} from "../controllers/router.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
// router.use(authenticateToken);

router.post("/", queryRouter);

export default router;