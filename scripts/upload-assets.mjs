import "zx/globals";
import crypto from "node:crypto";
import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import mime from "mime";
import manifest from "../cloud-assets/manifest.json" with { type: "json" };

const hashFile = (path) =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(path);

    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });

/**
 *  Uploads a file from the cloud-assets directory to the docs-assets bucket in R2
 * @param filePath {string} - The path to a file in the cloud-assets directory
 * @param manifest {object} - The current manifest object
 * @param hashToName {object} - Map of hash to filename
 * @param force {boolean} - Whether to force upload even if the file already exists
 */
async function processAsset(filePath, manifest, hashToName, force = false) {
  const asset = filePath.startsWith("cloud-assets")
    ? filePath
    : join("cloud-assets", filePath);
  const file = filePath.replace("cloud-assets/", "");
  const contentType = mime.getType(asset) || "application/octet-stream";
  const hash = await hashFile(asset);

  let existingKey = hashToName[hash];
  if (existingKey) {
    if (existingKey !== file) {
      // Merge all properties from the old object into the new one
      manifest[file] = { ...manifest[existingKey], ...manifest[file] };
      delete manifest[existingKey];
      console.log(`Renamed: ${existingKey} -> ${file}`);
      if (!force) return true;
      // If force, continue to upload and update manifest
    } else if (!force) {
      console.log(`File already uploaded: ${file}`);
      return false;
    }
    // If force, fall through to upload and update manifest
  }
  // New file or force upload
  await $`wrangler r2 object put lost-pet-assets/${hash} --file=${asset} --content-type=${contentType}`;
  await $`wrangler r2 object put lost-pet-assets/${hash} --remote --file=${asset} --content-type=${contentType}`;
  manifest[file] = {
    ...manifest[file],
    hash,
    "content-type": contentType,
  };
  hashToName[hash] = file;
  console.log(`Uploaded: ${file}`);
  return true;
}

// Main logic: upload all files in cloud-assets except manifest.json
if (import.meta.url.startsWith("file:")) {
  const modulePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    const { readdir } = await import("node:fs/promises");
    const dir = "cloud-assets";
    const files = (await readdir(dir)).filter((f) =>
      f !== "manifest.json" && f !== "README.md"
    );
    const force = process.argv.includes("--force");
    // Build hash-to-filename map
    const hashToName = {};
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
      await writeFile(
        "cloud-assets/manifest.json",
        JSON.stringify(manifest, null, 2),
      );
      console.log("Manifest updated.");
    } else {
      console.log("No files uploaded or updated. Manifest not changed.");
    }
  }
}
