import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../validations/transaction.validation.js";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(createTransactionSchema),
  create
);
router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getById);
router.put(
  "/:id", authMiddleware, update
);
router.delete("/:id", authMiddleware, remove);
export default router;