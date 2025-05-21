import "zx/globals";
import crypto from "node:crypto";
import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mime from "mime";
import sharp from "sharp";
import manifest, { type CloudAssetManifest } from "../cloud-assets/manifest";

const hashFile = (path: string): Promise<string> =>
	new Promise((resolve, reject) => {
		const hash = crypto.createHash("sha256");
		const stream = fs.createReadStream(path);

		stream.on("data", (chunk) => hash.update(chunk));
		stream.on("end", () => resolve(hash.digest("hex")));
		stream.on("error", reject);
	});

/**
 *  Uploads a file from the cloud-assets directory to the docs-assets bucket in R2
 */
async function processAsset(
	filePath: string,
	manifest: CloudAssetManifest,
	hashToName: Record<string, string>,
	force = false,
) {
	const asset = filePath.startsWith("cloud-assets")
		? filePath
		: join("cloud-assets", filePath);
	const file = filePath.replace("cloud-assets/", "");
	const contentType = mime.getType(asset) || "application/octet-stream";
	const hash = await hashFile(asset);

	const existingKey = hashToName[hash];
	let updated = false;

	if (existingKey) {
		if (existingKey !== file) {
			// Merge all properties from the old object into the new one
			manifest[file] = { ...manifest[existingKey], ...manifest[file] };
			delete manifest[existingKey];
			console.log(`Renamed: ${existingKey} -> ${file}`);
			updated = true;
		} else if (!force) {
			console.log(`File already uploaded: ${file}`);
		}
	}

	// If file is new, force is true, or file was renamed, upload it
	if (!existingKey || force || updated) {
		await $`wrangler r2 object put lost-pet-assets/${hash} --file=${asset} --content-type=${contentType}`;
		await $`wrangler r2 object put lost-pet-assets/${hash} --remote --file=${asset} --content-type=${contentType}`;
		manifest[file] = {
			...manifest[file],
			hash,
			"content-type": contentType,
		};
		hashToName[hash] = file;
		console.log(`Uploaded: ${file}`);
		updated = true;
	}

	// --- VARIANT HANDLING ---
	// Check if variants are defined and process any missing ones
	if (manifest[file]) {
		// Ensure variants array exists
		if (!Array.isArray(manifest[file].variants)) {
			manifest[file].variants = [];
		}

		// Process each variant
		for (const variant of manifest[file].variants) {
			const { name, transform } = variant;
			if (!name || !transform) continue;

			// Build variant filename
			const ext = extname(file);
			const base = basename(file, ext);
			const variantFile = `${base}--${name}${ext}`;
			const variantPath = join("cloud-assets", variantFile);

			// Check if variant exists and matches current definition
			const existingVariant = manifest[variantFile];
			const variantNeedsUpdate =
				!existingVariant ||
				!existingVariant.parent ||
				existingVariant.parent !== file ||
				!existingVariant.transform ||
				JSON.stringify(existingVariant.transform) !==
					JSON.stringify(transform) ||
				force;

			if (variantNeedsUpdate) {
				// Generate and process the variant
				let image = sharp(asset);

				// Apply all transforms in sequence
				if (transform) {
					// Apply resize first if it exists
					if (transform.resize) {
						image = image.resize(transform.resize);
					}

					// Apply format-specific options
					if (transform.jpeg) {
						image = image.jpeg(transform.jpeg);
					}
					// Add more transform types here as needed
				}

				await image.toFile(variantPath);

				// Upload the variant
				const variantHash = await hashFile(variantPath);
				const variantContentType =
					mime.getType(variantPath) || "application/octet-stream";
				await $`wrangler r2 object put lost-pet-assets/${variantHash} --file=${variantPath} --content-type=${variantContentType}`;
				await $`wrangler r2 object put lost-pet-assets/${variantHash} --remote --file=${variantPath} --content-type=${variantContentType}`;

				manifest[variantFile] = {
					parent: file,
					variant: name,
					transform,
					hash: variantHash,
					"content-type": variantContentType,
				};
				hashToName[variantHash] = variantFile;
				console.log(`Generated and uploaded variant: ${variantFile}`);
				updated = true;

				// Clean up temporary variant file
				fs.unlinkSync(variantPath);
			} else {
				console.log(`Variant already exists and is up to date: ${variantFile}`);
			}
		}
	}
	// --- END VARIANT HANDLING ---

	return updated;
}

// Main logic: upload all files in cloud-assets except manifest.json
if (import.meta.url.startsWith("file:")) {
	const modulePath = fileURLToPath(import.meta.url);
	if (process.argv[1] === modulePath) {
		const { readdir } = await import("node:fs/promises");
		const dir = "cloud-assets";
		const files = (await readdir(dir)).filter(
			(f) => f !== "manifest.ts" && f !== "README.md",
		);
		const force = process.argv.includes("--force");
		// Build hash-to-filename map
		const hashToName: Record<string, string> = {};
		for (const [name, obj] of Object.entries(manifest)) {
			if (obj && typeof obj === "object" && obj.hash) {
				hashToName[obj.hash] = name;
			}
		}
		let updated = false;
		for (const file of files) {
			try {
				const didUpdate = await processAsset(
					join(dir, file),
					manifest,
					hashToName,
					force,
				);
				if (didUpdate) updated = true;
			} catch (err) {
				console.error(`Failed to process ${file}:`, err);
			}
		}
		if (updated) {
			// Update only the manifest object in manifest.ts using special comments
			const manifestPath = join("cloud-assets", "manifest.ts");
			const manifestFile = fs.readFileSync(manifestPath, "utf8");
			const manifestString = JSON.stringify(manifest, null, 2);
			const begin = manifestFile.indexOf("// #region manifest");
			const end = manifestFile.indexOf("// #endregion manifest");
			if (begin === -1 || end === -1)
				throw new Error("Manifest delimiters not found");
			const before = `${manifestFile.slice(0, begin)}// #region manifest\n`;
			const after = `\n${manifestFile.slice(end)}`;
			const manifestBlock = `const manifest: CloudAssetManifest = ${manifestString.replace(/^/gm, "  ")};`;
			const updatedFile = before + manifestBlock + after;
			fs.writeFileSync(manifestPath, updatedFile);
			console.log("Manifest updated.");
		} else {
			console.log("No files uploaded or updated. Manifest not changed.");
		}
	}
}
