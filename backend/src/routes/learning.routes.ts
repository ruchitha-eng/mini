import { Router } from "express";
import { generateContent, getHistory, clearHistory } from "../controllers/learning.controller.ts";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = Router();

router.post("/generate", authMiddleware, generateContent);
router.get("/history", authMiddleware, getHistory);
router.delete("/clear", authMiddleware, clearHistory);

export default router;
