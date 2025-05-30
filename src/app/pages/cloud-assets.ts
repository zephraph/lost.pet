import { env } from "cloudflare:workers";
import manifest from "cloud-assets/manifest";
import { route } from "rwsdk/router";

export const cloudAssetRoutes = [
	route("/:file", async (ctx) => {
		const file: keyof typeof manifest = ctx.params.file;

		if (!(file in manifest)) {
			return new Response("Not found", { status: 404 });
		}

		const asset = await env.BUCKET.get(manifest[file].hash);

		if (!asset) {
			return new Response("Not found", { status: 404 });
		}

		const contentType =
			asset.httpMetadata?.contentType || "application/octet-stream";
		return new Response(asset.body, {
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=600",
				ETag: manifest[file].hash,
			},
		});
	}),
];
