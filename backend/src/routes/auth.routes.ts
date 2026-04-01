import { Router } from "express";
import { register, login, getMe,changePassword } from "../controllers/auth.controller.ts";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changePassword",authMiddleware, changePassword);
router.get("/me", authMiddleware, getMe);

export default router;