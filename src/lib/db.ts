import "server-only";
import { Pool } from "pg";

// One connection pool per server process, kept across hot reloads in dev.
const globalForDb = globalThis as unknown as { pgPool?: Pool; schemaReady?: Promise<void> };

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  if (!globalForDb.pgPool) {
    // Neon closes idle connections, so they are let go quickly here too.
    const pool = new Pool({ connectionString, max: 5, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 10_000 });
    // A dropped idle connection must not crash the server; the pool replaces it.
    pool.on("error", (error) => console.warn("Database connection dropped:", error.message));
    globalForDb.pgPool = pool;
  }
  return globalForDb.pgPool;
}

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

// Tables are created the first time they are needed, so a fresh database works
// without a separate setup step.
const SCHEMA = `
  create table if not exists site_content (
    id int primary key default 1 check (id = 1),
    data jsonb not null,
    updated_at timestamptz not null default now()
  );
  create table if not exists consultations (
    id serial primary key,
    created_at timestamptz not null default now(),
    parent_name text not null,
    whatsapp text not null,
    child_age text not null,
    level text not null,
    slot text not null
  );
  create table if not exists admin_account (
    id int primary key default 1 check (id = 1),
    username text not null,
    password_hash text not null,
    session_secret text not null,
    updated_at timestamptz not null default now()
  );
  create table if not exists media (
    id text primary key,
    content_type text not null,
    bytes bytea not null,
    created_at timestamptz not null default now()
  );
`;

export async function query<T extends object = Record<string, unknown>>(
  text: string,
  values: unknown[] = [],
) {
  const pool = getPool();
  globalForDb.schemaReady ??= pool.query(SCHEMA).then(
    () => undefined,
    (error) => {
      globalForDb.schemaReady = undefined;
      throw error;
    },
  );
  await globalForDb.schemaReady;
  try {
    return (await pool.query<T>(text, values)).rows;
  } catch (error) {
    // One retry when the connection itself failed (not for SQL errors).
    if (!isConnectionError(error)) throw error;
    return (await pool.query<T>(text, values)).rows;
  }
}

function isConnectionError(error: unknown) {
  const code = (error as { code?: string })?.code ?? "";
  const message = error instanceof Error ? error.message : "";
  return (
    ["ECONNRESET", "EADDRNOTAVAIL", "EPIPE", "ETIMEDOUT", "57P01"].includes(code) ||
    /Connection terminated|connection timeout/i.test(message)
  );
}
