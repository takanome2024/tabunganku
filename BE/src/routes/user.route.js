import express from "express";
import { profile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, profile);

export default router;