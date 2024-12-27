import express from "express";
import {
    getProfile,
    updateProfile
} from "../controllers/profile.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/", getProfile);
router.put("/", updateProfile);

export default router;