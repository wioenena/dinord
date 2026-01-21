import type { ImageFormat, ImageSize } from "./types.d.ts";

export const IMAGE_BASE_URL = "https://cdn.discordapp.com";

export const ALLOWED_SIZES = new Set<ImageSize>([16, 32, 64, 128, 256, 512, 1024, 2048, 4096]);

export const COMMON_IMAGE_FORMATS = Object.freeze([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
] as const satisfies readonly ImageFormat[]);
export const GIF_IMAGE_FORMATS = Object.freeze([...COMMON_IMAGE_FORMATS, ".gif"] as const satisfies readonly ImageFormat[]);
export const EMOJI_IMAGE_FORMATS = Object.freeze([...GIF_IMAGE_FORMATS, ".avif"] as const satisfies readonly ImageFormat[]);
export const STICKER_IMAGE_FORMATS = Object.freeze([".png", ".json", ".gif"] as const satisfies readonly ImageFormat[]);
