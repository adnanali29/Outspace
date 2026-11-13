import "server-only";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { connection } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "./db";

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

const COOKIE = "outpace_admin";
const SESSION_DAYS = 7;

// Used only until the admin changes them in Settings.
export const DEFAULT_USERNAME = "1";
const DEFAULT_PASSWORD = "1";

type Account = { username: string; password_hash: string; session_secret: string };

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt}$${hash.toString("hex")}`;
}

async function checkPassword(password: string, stored: string) {
  const [, salt, hash] = stored.split("$");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = await scryptAsync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

export async function getAccount(): Promise<Account> {
  const rows = await query<Account>("select username, password_hash, session_secret from admin_account where id = 1");
  if (rows[0]) return rows[0];
  await query(
    "insert into admin_account (id, username, password_hash, session_secret) values (1, $1, $2, $3) on conflict (id) do nothing",
    [DEFAULT_USERNAME, await hashPassword(DEFAULT_PASSWORD), randomBytes(32).toString("hex")],
  );
  const created = await query<Account>("select username, password_hash, session_secret from admin_account where id = 1");
  return created[0];
}

// The signature covers the password hash, so changing the password signs
// everyone out.
function sign(account: Account, expires: number) {
  return createHmac("sha256", account.session_secret)
    .update(`${account.username}|${expires}|${account.password_hash}`)
    .digest("base64url");
}

export async function verifyLogin(username: string, password: string) {
  const account = await getAccount();
  const passwordOk = await checkPassword(password, account.password_hash);
  const usernameOk =
    username.length === account.username.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(account.username));
  return passwordOk && usernameOk ? account : null;
}

export async function startSession(account: Account) {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  (await cookies()).set(COOKIE, `${expires}.${sign(account, expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  // The expiry check uses the current time, so it must run per request.
  await connection();
  const [expiresText, signature] = value.split(".");
  const expires = Number(expiresText);
  if (!signature || !Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = Buffer.from(sign(await getAccount(), expires));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

// Call at the top of every admin page, action and route.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function usesDefaultLogin() {
  const account = await getAccount();
  return account.username === DEFAULT_USERNAME && (await checkPassword(DEFAULT_PASSWORD, account.password_hash));
}

export async function updateLogin(currentPassword: string, username: string, password: string) {
  const account = await getAccount();
  if (!(await checkPassword(currentPassword, account.password_hash))) {
    return "Your current password is not correct.";
  }
  await query("update admin_account set username = $1, password_hash = $2, updated_at = now() where id = 1", [
    username,
    await hashPassword(password),
  ]);
  await startSession(await getAccount());
  return null;
}
