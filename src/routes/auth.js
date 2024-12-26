import express from "express";
import {
    getUserProfile,
    registerUser,
    loginUser
} from "../controllers/auth";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.get("/", authenticateToken, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
