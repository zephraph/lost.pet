# Cloud Assets

This directory manages static assets (such as images) that are uploaded to and served from a cloud storage bucket (R2). It is designed to work with the asset upload and serving pipeline for the project.

## Files and Structure

- **manifest.json**: This file maps asset filenames to their content hashes and metadata. It is automatically updated by the upload script. Each entry includes the hash (used as the storage key in the bucket), content type, and optional metadata such as credits or source.
- **upload-assets.mjs**: This script uploads all files in the `cloud-assets` directory (except `manifest.json`) to the R2 bucket. It computes a SHA-256 hash for each file, uploads it under that hash, and updates `manifest.json` to map the original filename to the hash and content type. If a file is renamed or replaced, the manifest is updated accordingly. The script can be run with `--force` to re-upload all files even if they already exist in the bucket.
- **cloud-assets.ts**: This file defines a route for serving assets from the cloud bucket. When a request is made to `/cloud-assets/:file`, it looks up the file in `manifest.json`, retrieves the asset from the bucket using its hash, and returns it with the correct content type. If the file is not found, it returns a 404 response.

## Usage

1. Place your static assets (e.g., images) in this directory.
2. Run `mise upload-assets` to upload assets and update the manifest.
3. Assets are served via the route defined in `cloud-assets.ts`, using the original filename as the URL path.

This setup ensures assets are efficiently managed, deduplicated, and served with correct metadata.

