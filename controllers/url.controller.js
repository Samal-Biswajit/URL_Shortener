import { nanoid } from "nanoid";

import { shortenPostRequestBody } from "../validation/request.validation.js";
import {
  createURLTableEntry,
  getTargetURLByShortCode,
  deleteURLByID,
} from "../services/url.service.js";
import { getAllShortenURLs } from "../services/url.service.js";

export async function getAllURLs(req, res) {
  const codes = await getAllShortenURLs(req.user.id);

  return res.json({ codes });
}

export async function addShortenURL(req, res) {
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
}

export async function deleteURL(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const result = await deleteURLByID(id, userId);

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.status(200).json({ deleted: true });
}

export async function getTargetURL(req, res) {
  const code = req.params.shortCode;

  const result = await getTargetURLByShortCode(code);

  if (!result) {
    return res.status(404).json({ error: "Invalid URL" });
  }

  return res.redirect(result.targetURL);
}
