import express from "express";
import {
    getChats,
    getChatByID,
    getLatestChat,
    createChat,
    updateChat,
    deleteChat
} from "../controllers/chats.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/", getChats);
router.get("/latest", getLatestChat);
router.get("/:id", getChatByID);
router.post("/", createChat);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

export default router;