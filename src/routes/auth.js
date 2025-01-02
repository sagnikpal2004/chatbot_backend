import express from "express";
import {
    getUserProfile,
    registerUser,
    loginUser,
    // deleteUser,
} from "../controllers/auth.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.delete("/", authenticateToken, deleteUser);

export default router;
