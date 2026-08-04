import express from "express";

import {
  getAll,
  create,
  update,
  remove,
} from "../controllers/period.controller.js";


import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();



router.get(
  "/",
  authMiddleware,
  getAll
);


router.post(
  "/",
  authMiddleware,
  create
);


router.put(
  "/:id",
  authMiddleware,
  update
);


router.delete(
  "/:id",
  authMiddleware,
  remove
);



export default router;