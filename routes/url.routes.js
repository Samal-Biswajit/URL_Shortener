import express from "express";
import { nanoid } from "nanoid";

import { shortenPostRequestBody } from "../validation/request.validation.js";
import {
  createURLTableEntry,
  getTargetURLByShortCode,
  deleteURLByID,
} from "../services/url.service.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { getAllShortenURLs } from "../services/url.service.js";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async (req, res) => {
  const validationResult = await shortenPostRequestBody.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { url, code } = validationResult.data;
  const shortCode = code ?? nanoid(6);
  const result = await createURLTableEntry(shortCode, url, req.user.id);

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

router.get("/codes", ensureAuthenticated, async (req, res) => {
  const codes = await getAllShortenURLs(req.user.id);

  return res.json({ codes });
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  await deleteURLByID(id, userId);

  return res.status(200).json({ deleted: true });
});
router.get("/:shortCode", async (req, res) => {
  const code = req.params.shortCode;

  const result = await getTargetURLByShortCode(code);

  if (!result) {
    return res.json({ error: "Invalid URL" });
  }

  return res.redirect(result.targetURL);
});

export default router;
