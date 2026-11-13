import { query } from "@/lib/db";

// Serves images uploaded in the admin panel. Each upload gets a new name, so
// browsers and CDNs can keep them forever.
export async function GET(_: Request, { params }: RouteContext<"/media/[file]">) {
  const { file } = await params;
  if (!/^[\w-]+\.(jpg|png|webp|avif)$/.test(file)) return new Response("Not found", { status: 404 });

  const rows = await query<{ content_type: string; bytes: Buffer }>(
    "select content_type, bytes from media where id = $1",
    [file],
  );
  const image = rows[0];
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(image.bytes), {
    headers: {
      "Content-Type": image.content_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
