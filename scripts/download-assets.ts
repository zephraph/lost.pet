import "zx/globals";
import fs from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import manifest, { type CloudAssetManifest } from "../cloud-assets/manifest";

// Main logic: download all files in manifest
if (import.meta.url.startsWith("file:")) {
	const modulePath = fileURLToPath(import.meta.url);
	if (process.argv[1] === modulePath) {
		const dir = "cloud-assets";
		const force = process.argv.includes("--force");
		let updated = false;
		for (const [file, obj] of Object.entries(manifest as CloudAssetManifest)) {
			const dest = join(dir, file);
			if (!force && fs.existsSync(dest)) {
				console.log(`File already exists: ${file}`);
				continue;
			}
			try {
				await $`wrangler r2 object get lost-pet-assets/${obj.hash} --file=${dest}`;
				console.log(`Downloaded: ${file}`);
				updated = true;
			} catch (err) {
				console.error(`Failed to download ${file}:`, err);
			}
		}
		if (!updated) {
			console.log("No files downloaded or updated.");
		}
	}
}
