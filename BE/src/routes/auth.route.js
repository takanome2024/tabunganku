import express from "express";
import { login, register } from "../controllers/auth.controller.js";


const router = express.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: galang
 *               password:
 *                 type: string
 *                 example: Kmsg123$$$
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Username atau password salah
 */
router.post("/login", login);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: galang
 *               password:
 *                 type: string
 *                 example: Kmsg123$$$
 *     responses:
 *       201:
 *         description: Register berhasil
 *       409:
 *         description: Username sudah digunakan
 */
router.post("/register", register);

export default router;

console.log("AUTH ROUTE LOADED");

router.post("/register", register);