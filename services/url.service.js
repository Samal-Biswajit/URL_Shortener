import { db } from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { and, eq } from "drizzle-orm";

export async function createURLTableEntry(shortCode, url, userId) {
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetURL: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return result;
}

export async function getTargetURLByShortCode(code) {
  const [result] = await db
    .select({
      targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

  return result;
}

export async function getAllShortenURLs(userId) {
  const codes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId));

  return codes;
}

export async function deleteURLByID(id, userId) {
  await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, userId)));
}
