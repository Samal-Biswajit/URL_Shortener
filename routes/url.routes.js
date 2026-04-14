import express from "express";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addShortenURL,
  deleteURL,
  getAllURLs,
  getTargetURL,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, addShortenURL);
router.get("/codes", ensureAuthenticated, getAllURLs);
router.delete("/:id", ensureAuthenticated, deleteURL);
router.get("/:shortCode", getTargetURL);

export default router;
