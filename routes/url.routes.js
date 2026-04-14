import express from "express";
import { nanoid } from "nanoid";

import { shortenPostRequestBody } from "../validation/request.validation.js";
import { createURLTableEntry } from "../services/url.service.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

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

export default router;
