import { join } from "@std/path";
import type { Snowflake } from "../types.d.ts";
import { IMAGE_BASE_URL } from "./constants.ts";
import type { ImageSize, ValidateImageFormat } from "./types.d.ts";

export default {
  customEmoji: (emojiId: Snowflake, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif" | ".avif"> = ".webp", size: ImageSize) =>
    join(IMAGE_BASE_URL, "emojis", `${emojiId}${format}?size=${size}`),

  guildIcon: (
    guildId: Snowflake,
    iconHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "icons", guildId, `${iconHash}${format}?size=${size}`), // TODO: the hash will begin with a_ if it is available in GIF format.

  guildSplash: (guildId: Snowflake, splashHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, "splashes", guildId, `${splashHash}${format}?size=${size}`),

  guildDiscoverySplash: (
    guildId: Snowflake,
    discoverySplashHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">,
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "discovery-splashes", guildId, `${discoverySplashHash}${format}?size=${size}`),

  guildBanner: (
    guildId: Snowflake,
    bannerHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "banners", guildId, `${bannerHash}${format}?size=${size}`), // TODO: the hash will begin with a_ if it is available in GIF format.

  userBanner: (
    userId: Snowflake,
    bannerHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "banners", userId, `${bannerHash}${format}?size=${size}`), // TODO: the hash will begin with a_ if it is available in GIF format.

  defaultUserAvatar: (index: number) => join(IMAGE_BASE_URL, "embed", "avatars", `${index}.png`), // TODO: index formula (user_id >> 22) % 6. For users on the legacy username system, index will be discriminator % 5. Support this.

  userAvatar: (
    userId: Snowflake,
    avatarHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "avatars", userId, `${avatarHash}${format}?size=${size}`),

  guildMemberAvatar: (
    guildId: Snowflake,
    userId: Snowflake,
    guildMemberAvatarHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "guilds", guildId, "users", userId, "avatars", `${guildMemberAvatarHash}${format}?size=${size}`),

  avatarDecoration: (avatarDecorationHash: string, size: ImageSize) =>
    join(IMAGE_BASE_URL, "avatar-decoration-presets", `${avatarDecorationHash}.png?size=${size}`),

  applicationIcon: (applicationId: Snowflake, iconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, "app-icons", applicationId, `${iconHash}${format}?size=${size}`),

  applicationCover: (
    applicationId: Snowflake,
    coverImageHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">,
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "app-icons", applicationId, `${coverImageHash}${format}?size=${size}`),

  applicationAsset: (applicationId: Snowflake, assetId: never, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, "app-assets", applicationId, `${assetId}${format}?size=${size}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints

  achievementIcon: (
    applicationId: Snowflake,
    achievementId: number,
    iconHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">,
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "app-assets", applicationId, "achievements", achievementId.toString(), "icons", `${iconHash}${format}?size=${size}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints

  storePageAsset: (applicationId: Snowflake, assetId: never, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, "app-assets", applicationId, "store", `${assetId}${format}?size=${size}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints

  stickerPackBanner: (stickerPackBannerAssetId: Snowflake, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, "app-assets", "710982414301790216", "store", `${stickerPackBannerAssetId}${format}?size=${size}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints

  teamIcon: (teamId: Snowflake, teamIconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, teamId, `${teamIconHash}${format}?size=${size}`),

  sticker: (stickerId: Snowflake, format: ValidateImageFormat<".png" | ".json" | ".gif">) =>
    join(IMAGE_BASE_URL, "stickers", `${stickerId}${format}`), // TODO: look "In the case of the Default User Avatar and Sticker endpoints, the size of images returned is constant with the "size" querystring parameter being ignored." this note.

  roleIcon: (roleId: Snowflake, iconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">, size: ImageSize) =>
    join(IMAGE_BASE_URL, "role-icons", roleId, `${iconHash}${format}?size=${size}`),

  guildScheduledEventCover: (
    scheduledEventId: Snowflake,
    coverImageHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">,
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "guild-events", scheduledEventId, `${coverImageHash}${format}?size=${size}`),

  guildMemberBanner: (
    guildId: Snowflake,
    userId: Snowflake,
    memberBannerHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
    size: ImageSize,
  ) => join(IMAGE_BASE_URL, "guilds", guildId, "users", userId, "banners", `${memberBannerHash}${format}?size=${size}`),

  guildTagBadge: (guildId: Snowflake, badgeHash: string, format: ".png" | ".jpg" | ".jpeg" | ".webp", size: ImageSize) =>
    join(IMAGE_BASE_URL, "guild-tag-badges", guildId, `${badgeHash}${format}?size=${size}`),
} as const;
