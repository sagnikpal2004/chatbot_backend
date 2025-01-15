import express from "express";
import {
    createContent,
    // updateContent
} from "../controllers/content.js";

const router = express.Router();

// router.get("/", getAllContent);
router.post("/", createContent);
// router.update("/:id", updateContent);
// router.delete("/:id", deleteContent);

export default router;