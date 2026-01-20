import { join } from "@std/path";
import type { Snowflake } from "../types.d.ts";
import { IMAGE_BASE_URL } from "./constants.ts";
import type { ValidateImageFormat } from "./types.d.ts";

export const CDN_ENDPOINTS = Object.freeze({
  customEmoji: (emojiId: Snowflake, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif" | ".avif"> = ".webp") =>
    join(IMAGE_BASE_URL, "emojis", `${emojiId}${format}`),
  guildIcon: (guildId: Snowflake, iconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp") =>
    join(IMAGE_BASE_URL, "icons", guildId, `${iconHash}${format}`), // TODO: the hash will begin with a_ if it is available in GIF format.
  guildSplash: (guildId: Snowflake, splashHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "splashes", guildId, `${splashHash}${format}`),
  guildDiscoverySplash: (guildId: Snowflake, discoverySplashHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "discovery-splashes", guildId, `${discoverySplashHash}${format}`),
  guildBanner: (guildId: Snowflake, bannerHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp") =>
    join(IMAGE_BASE_URL, "banners", guildId, `${bannerHash}${format}`), // TODO: the hash will begin with a_ if it is available in GIF format.
  userBanner: (userId: Snowflake, bannerHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp") =>
    join(IMAGE_BASE_URL, "banners", userId, `${bannerHash}${format}`), // TODO: the hash will begin with a_ if it is available in GIF format.
  defaultUserAvatar: (index: number) => join(IMAGE_BASE_URL, "embed", "avatars", `${index}.png`), // TODO: index formula (user_id >> 22) % 6. For users on the legacy username system, index will be discriminator % 5. Support this.
  userAvatar: (userId: Snowflake, avatarHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp") =>
    join(IMAGE_BASE_URL, "avatars", userId, `${avatarHash}${format}`),
  guildMemberAvatar: (
    guildId: Snowflake,
    userId: Snowflake,
    guildMemberAvatarHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
  ) => join(IMAGE_BASE_URL, "guilds", guildId, "users", userId, "avatars", `${guildMemberAvatarHash}${format}`),
  avatarDecoration: (avatarDecorationHash: string) => join(IMAGE_BASE_URL, "avatar-decoration-presets", `${avatarDecorationHash}.png`),
  applicationIcon: (applicationId: Snowflake, iconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "app-icons", applicationId, `${iconHash}${format}`),
  applicationCover: (applicationId: Snowflake, coverImageHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "app-icons", applicationId, `${coverImageHash}${format}`),
  applicationAsset: (applicationId: Snowflake, assetId: never, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "app-assets", applicationId, `${assetId}${format}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints
  achievementIcon: (
    applicationId: Snowflake,
    achievementId: number,
    iconHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">,
  ) => join(IMAGE_BASE_URL, "app-assets", applicationId, "achievements", achievementId.toString(), "icons", `${iconHash}${format}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints
  storePageAsset: (applicationId: Snowflake, assetId: never, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "app-assets", applicationId, "store", `${assetId}${format}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints
  stickerPackBanner: (stickerPackBannerAssetId: Snowflake, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "app-assets", "710982414301790216", "store", `${stickerPackBannerAssetId}${format}`), // TODO: I need to think about this. See https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints
  teamIcon: (teamId: Snowflake, teamIconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, teamId, `${teamIconHash}${format}`),
  sticker: (stickerId: Snowflake, format: ValidateImageFormat<".png" | ".json" | ".gif">) =>
    join(IMAGE_BASE_URL, "stickers", `${stickerId}${format}`), // TODO: look "In the case of the Default User Avatar and Sticker endpoints, the size of images returned is constant with the "size" querystring parameter being ignored." this note.
  roleIcon: (roleId: Snowflake, iconHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "role-icons", roleId, `${iconHash}${format}`),
  guildScheduledEventCover: (scheduledEventId: Snowflake, coverImageHash: string, format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp">) =>
    join(IMAGE_BASE_URL, "guild-events", scheduledEventId, `${coverImageHash}${format}`),
  guildMemberBanner: (
    guildId: Snowflake,
    userId: Snowflake,
    memberBannerHash: string,
    format: ValidateImageFormat<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif"> = ".webp",
  ) => join(IMAGE_BASE_URL, "guilds", guildId, "users", userId, "banners", `${memberBannerHash}${format}`),
  guildTagBadge: (guildId: Snowflake, badgeHash: string, format: ".png" | ".jpg" | ".jpeg" | ".webp") =>
    join(IMAGE_BASE_URL, "guild-tag-badges", guildId, `${badgeHash}${format}`),
});
