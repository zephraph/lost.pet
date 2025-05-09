import { env } from "cloudflare:workers";
import { route } from "rwsdk/router";

export const cloudAssetRoutes = [
  route("/:file", async (ctx) => {
    const file = ctx.params.file;

    const asset = await env.BUCKET.get(file);

    if (!asset) {
      return new Response("Not found", { status: 404 });
    }

    const contentType = asset.httpMetadata?.contentType || 'application/octet-stream';
    return new Response(asset.body, { headers: { 'Content-Type': contentType } });
  }),
];