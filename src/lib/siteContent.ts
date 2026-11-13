import "server-only";
import { cacheTag } from "next/cache";
import { defaultContent, type SiteContent } from "@/content";
import { hasDatabase, query } from "./db";

export const CONTENT_TAG = "site-content";

const PIECES = ["p", "n", "b", "r", "q", "k"];

// These lists drive the page's code (the chess levels), so only their labels
// can change: no adding, removing or reordering.
const FIXED_LISTS = new Set(["game.levels"]);

// Lays saved content over the defaults. Only fields that exist in the defaults
// survive, each must keep its type, and anything missing falls back, so the
// page never breaks when a field is added in code or saved data is odd.
function merge(fallback: unknown, saved: unknown, path: string): unknown {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(saved)) return fallback;
    if (FIXED_LISTS.has(path)) {
      return fallback.map((item, i) => merge(item, saved[i], `${path}.*`));
    }
    const template = fallback[0];
    if (template === undefined) return saved.filter((item) => typeof item === "string");
    return saved.map((item) => merge(template, item, `${path}.*`));
  }
  if (fallback && typeof fallback === "object") {
    const source = saved && typeof saved === "object" && !Array.isArray(saved) ? (saved as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(fallback).map(([key, value]) => [key, merge(value, source[key], `${path ? `${path}.` : ""}${key}`)]),
    );
  }
  if (path === "game.levels.*.value") return fallback;
  if (path.endsWith(".piece")) return typeof saved === "string" && PIECES.includes(saved) ? saved : fallback;
  if (typeof fallback === "number") return typeof saved === "number" && Number.isFinite(saved) ? saved : fallback;
  if (typeof fallback === "string") return typeof saved === "string" ? saved : fallback;
  if (typeof fallback === "boolean") return typeof saved === "boolean" ? saved : fallback;
  return fallback;
}

export function cleanContent(saved: unknown) {
  return merge(defaultContent, saved, "") as SiteContent;
}

// The latest saved content, straight from the database (used by the editor).
export async function readSavedContent() {
  const rows = await query<{ data: unknown }>("select data from site_content where id = 1");
  return cleanContent(rows[0]?.data);
}

// What the public page shows. Cached, and refreshed when the admin saves.
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  if (!hasDatabase()) return defaultContent;
  try {
    return await readSavedContent();
  } catch (error) {
    console.error("Could not load saved content, showing defaults.", error);
    return defaultContent;
  }
}

export async function writeContent(saved: unknown) {
  const content = cleanContent(saved);
  await query(
    `insert into site_content (id, data, updated_at) values (1, $1, now())
     on conflict (id) do update set data = excluded.data, updated_at = now()`,
    [JSON.stringify(content)],
  );
  return content;
}
