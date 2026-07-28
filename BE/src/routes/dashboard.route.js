import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { summary } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", authMiddleware, summary);

export default router;