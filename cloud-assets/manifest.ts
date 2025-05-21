import type { JpegOptions, ResizeOptions } from "sharp";

export type CloudAssetVariant = {
	name: string;
	transform: {
		resize?: ResizeOptions;
		jpeg?: JpegOptions;
	};
};

export type CloudAssetManifest = {
	[filename: string]: {
		hash: string;
		"content-type": string;
		credits?: {
			name: string;
			url: string;
		}[];
		source?: string;
		variants?: CloudAssetVariant[];
		parent?: string;
		variant?: string;
		transform?: CloudAssetVariant["transform"];
	};
};

// #region manifest
const manifest: CloudAssetManifest = {
	"homepage-bg.jpg": {
		hash: "8e74a9fc9c9ebe549a7d0939b153954bc124bea1c53769130151302979f943ed",
		"content-type": "image/jpeg",
		credits: [
			{
				name: "Julian Hochgesang",
				url: "https://unsplash.com/@julianhochgesang",
			},
		],
		source:
			"https://unsplash.com/photos/a-dog-that-is-sitting-down-in-the-sand-Xlu7M8OtW6o",
		variants: [
			{
				name: "offset",
				transform: {
					resize: {
						width: 1920,
						height: 1080,
						position: "left",
						fit: "cover",
					},
				},
			},
			{
				name: "desktop",
				transform: {
					resize: {
						width: 1920,
						fit: "cover",
					},
				},
			},
			{
				name: "tablet",
				transform: {
					resize: {
						width: 1024,
						fit: "cover",
					},
				},
			},
			{
				name: "mobile",
				transform: {
					resize: {
						width: 640,
						fit: "cover",
					},
				},
			},
		],
	},
	"404-bg.jpg": {
		hash: "9d9dc14d7f33e7841c6bf5aa1f17ec7a4348ce5311d445b4815fa0720a2c986c",
		"content-type": "image/jpeg",
		credits: [
			{
				name: "Artūrs Ķipsts",
				url: "https://unsplash.com/@skvaad",
			},
		],
		source:
			"https://unsplash.com/photos/brown-long-coat-small-dog-walking-on-street-during-daytime-NCArqzab0AI",
		variants: [],
	},
	"homepage-bg--desktop.jpg": {
		parent: "homepage-bg.jpg",
		variant: "desktop",
		transform: {
			resize: {
				width: 1920,
				fit: "cover",
			},
		},
		hash: "3abf2e70961d07ba38b0740a1cb1484df2b23f7f2524a62300b3b80f88dcfb87",
		"content-type": "image/jpeg",
	},
	"homepage-bg--tablet.jpg": {
		parent: "homepage-bg.jpg",
		variant: "tablet",
		transform: {
			resize: {
				width: 1024,
				fit: "cover",
			},
		},
		hash: "ef73b4f21bd77b74d4ea52545bcb5e966401c75b3308cabcf3f3878595a9b9a6",
		"content-type": "image/jpeg",
	},
	"homepage-bg--mobile.jpg": {
		parent: "homepage-bg.jpg",
		variant: "mobile",
		transform: {
			resize: {
				width: 640,
				fit: "cover",
			},
		},
		hash: "df5981a257b2be6bf39f1ec27c8dbd79ffeb47028d6762b2b16ed1aa9bdfa40c",
		"content-type": "image/jpeg",
	},
	"homepage-bg--offset.jpg": {
		parent: "homepage-bg.jpg",
		variant: "offset",
		transform: {
			resize: {
				width: 1920,
				height: 1080,
				position: "left",
				fit: "cover",
			},
		},
		hash: "14220c9b38d8cb0700850493b028261ca4ae04e30ff3006bafb02cb0e3ea81b1",
		"content-type": "image/jpeg",
	},
};
// #endregion manifest

export default manifest;
