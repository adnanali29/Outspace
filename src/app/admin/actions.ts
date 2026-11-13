"use server";

import { randomBytes } from "node:crypto";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, requireAdmin, startSession, updateLogin, verifyLogin } from "@/lib/auth";
import { query } from "@/lib/db";
import { CONTENT_TAG, writeContent } from "@/lib/siteContent";

export type FormState = { error?: string; ok?: string } | null;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const account = await verifyLogin(username, password);
  if (!account) {
    // Slows down repeated guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "That ID or password is not correct." };
  }
  await startSession(account);
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function saveHomepage(content: unknown) {
  await requireAdmin();
  await writeContent(content);
  updateTag(CONTENT_TAG);
  return { savedAt: new Date().toISOString() };
}

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024;

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file was received." };
  const extension = IMAGE_TYPES[file.type];
  if (!extension) return { error: "Please upload a JPG, PNG or WebP image." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "That image is too large. Please use one under 3.5 MB." };

  const id = `${randomBytes(9).toString("base64url")}.${extension}`;
  await query("insert into media (id, content_type, bytes) values ($1, $2, $3)", [
    id,
    file.type,
    Buffer.from(await file.arrayBuffer()),
  ]);
  return { url: `/media/${id}` };
}

export async function deleteConsultation(id: number) {
  await requireAdmin();
  await query("delete from consultations where id = $1", [id]);
}

export async function changeLogin(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!username) return { error: "Please enter a login ID." };
  if (username.length > 60) return { error: "Please keep the login ID under 60 characters." };
  if (password.length < 8) return { error: "Please use a password of at least 8 characters." };
  if (password !== confirm) return { error: "The two new passwords don't match." };

  const problem = await updateLogin(current, username, password);
  if (problem) return { error: problem };
  return { ok: "Saved. Use your new ID and password next time you log in." };
}
