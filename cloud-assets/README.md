# Cloud Assets

This directory manages static assets (such as images) that are uploaded to and served from a cloud storage bucket (R2). It is designed to work with the asset upload and serving pipeline for the project, with support for image variants and transformations.

## Files and Structure

- **`cloud-assets/manifest.ts`**: This TypeScript file exports the asset manifest as a strongly-typed object. It maps asset filenames to their content hashes, metadata, and variant configurations. Each entry includes:
  - hash: Used as the storage key in the bucket
  - content-type: The MIME type of the asset
  - credits: Optional array of attribution information (name and URL)
  - source: Optional source URL of the asset
  - variants: Optional array of image variants with transformation configurations
  - parent/variant/transform: Used for variant assets to track their relationship to the original
- **`scripts/upload-assets.ts`**: This TypeScript script processes and uploads files in the `cloud-assets` directory (except `manifest.ts`). Key features:
  - Computes SHA-256 hash for each file and uploads it to R2
  - Automatically generates and uploads image variants based on configurations
  - Supports image transformations like resizing and format-specific options
  - Updates `manifest.ts` to track all assets and their variants
  - Can be run with `--force` to re-upload all files and regenerate variants
- **`scripts/download-assets.ts`**: This TypeScript script downloads all assets from the R2 bucket to your local `cloud-assets` directory. Key features:
  - Downloads files based on the manifest configuration
  - Skips existing files unless `--force` flag is used
  - Maintains the same file structure as defined in the manifest
  - Useful for setting up new development environments or syncing with the latest assets
- **`src/app/pages/cloud-assets.ts`**: Defines a route for serving assets from the cloud bucket. When a request is made to `/cloud-assets/:file`, it:
  - Looks up the file in the manifest
  - Retrieves the asset from the bucket using its hash
  - Returns it with the correct content type
  - Supports serving both original assets and their variants

## Usage

1. Place your static assets (e.g., images) in this directory.
2. To configure variants for an image:
   - Add a `variants` array to its entry in `manifest.ts`
   - Each variant can specify transformations like resize options and format-specific settings
   - Variant files are automatically generated and uploaded with the naming pattern `filename--variantname.ext`
3. Run `mise upload-assets` to:
   - Upload new or modified assets
   - Generate and upload any configured variants
   - Update the manifest
   - Use `--force` flag to re-upload everything
4. To sync assets from the cloud:
   - Run `mise download-assets` to download all assets defined in the manifest
   - Use `--force` to re-download and overwrite existing files
5. Access assets via the route defined in `cloud-assets.ts`:
   - Original assets: `/cloud-assets/filename.ext`
   - Variants: `/cloud-assets/filename--variantname.ext`

This setup provides a robust asset management system with:
- Type-safe manifest management
- Automatic variant generation and tracking
- Efficient asset deduplication
- Proper content type handling
- Support for image transformations

