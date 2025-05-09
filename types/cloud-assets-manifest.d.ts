declare module "cloud-assets/manifest.json" {
  const value: CloudAssetManifest;
  export default value;
}

export type CloudAssetManifest = {
  [filename: string]: {
    hash: string;
    "content-type": string;
    credits?: {
      name: string;
      url: string;
    }[];
    source?: string;
  };
}; 