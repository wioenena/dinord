export type ImageFormat = ".jpg" | ".jpeg" | ".png" | ".webp" | ".gif" | ".avif" | ".json";
export type ValidateImageFormat<T extends ImageFormat> = T;
