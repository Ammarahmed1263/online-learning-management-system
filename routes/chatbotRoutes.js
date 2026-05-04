import express from "express";
import * as chatbotController from "../controllers/chatbotController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Allow authenticated users to chat with the bot
router.post("/chat", authMiddleware, chatbotController.chat);

export default router;
