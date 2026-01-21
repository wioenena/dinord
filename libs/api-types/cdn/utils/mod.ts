import type { Snowflake } from "@dinord/snowflake";
import { joinURL } from "@dinord/url";
import type { StrictSubSet } from "@dinord/utils";
import { IMAGE_BASE_URL } from "../constants.ts";
import type { ImageFormat, ImageSize } from "../types.d.ts";

export const getDefaultUserAvatarIndexById = (userId: Snowflake) => {
  return Number((userId.value >> 22n) % 6n);
};

export const validateFormat = (format: ImageFormat, allowed: ImageFormat[]) => {
  if (!allowed.includes(format)) {
    throw new Error(`Invalid format provided: "${format}". Allowed formats are: ${allowed.join(", ")}`);
  }
};

export const validateSize = (size: ImageSize) => {
  if (
    size === 16 ||
    size === 32 ||
    size === 64 ||
    size === 128 ||
    size === 256 ||
    size === 512 ||
    size === 1024 ||
    size === 2048 ||
    size === 4096
  )
    return;

  throw new Error(`Invalid size provided: "${size}". Allowed sizes are: 16, 32, 64, 128, 256, 512, 1024, 2048, 4096`);
};

export const CdnEndpoints = Object.freeze({
  customEmoji: (
    emojiId: Snowflake,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif" | ".avif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".avif"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "emojis", `${emojiId}${format}?size=${size}`);
  },

  guildIcon: (
    guildId: Snowflake,
    iconHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "icons", guildId.toString(), `${iconHash}${format}?size=${size}`);
  },

  guildSplash: (
    guildId: Snowflake,
    splashHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "splashes", guildId.toString(), `${splashHash}${format}?size=${size}`);
  },

  guildDiscoverySplash: (
    guildId: Snowflake,
    discoverySplashHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "discovery-splashes", guildId.toString(), `${discoverySplashHash}${format}?size=${size}`);
  },

  guildBanner: (
    guildId: Snowflake,
    bannerHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "banners", guildId.toString(), `${bannerHash}${format}?size=${size}`);
  },

  userBanner: (
    userId: Snowflake,
    bannerHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "banners", userId.toString(), `${bannerHash}${format}?size=${size}`);
  },

  defaultUserAvatar: (index: number) => joinURL(IMAGE_BASE_URL, "embed", "avatars", `${index}.png`),

  userAvatar: (
    userId: Snowflake,
    avatarHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "avatars", userId.toString(), `${avatarHash}${format}?size=${size}`);
  },

  guildMemberAvatar: (
    guildId: Snowflake,
    userId: Snowflake,
    guildMemberAvatarHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
    validateSize(size);

    return joinURL(
      IMAGE_BASE_URL,
      "guilds",
      guildId.toString(),
      "users",
      userId.toString(),
      "avatars",
      `${guildMemberAvatarHash}${format}?size=${size}`,
    );
  },

  avatarDecoration: (avatarDecorationHash: string, size: ImageSize) => {
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "avatar-decoration-presets", `${avatarDecorationHash}.png?size=${size}`);
  },

  applicationIcon: (
    applicationId: Snowflake,
    iconHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-icons", applicationId.toString(), `${iconHash}${format}?size=${size}`);
  },

  applicationCover: (
    applicationId: Snowflake,
    coverImageHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-icons", applicationId.toString(), `${coverImageHash}${format}?size=${size}`);
  },

  applicationAsset: (
    applicationId: Snowflake,
    assetId: Snowflake,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-assets", applicationId.toString(), `${assetId}${format}?size=${size}`);
  },

  achievementIcon: (
    applicationId: Snowflake,
    achievementId: number,
    iconHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(
      IMAGE_BASE_URL,
      "app-assets",
      applicationId.toString(),
      "achievements",
      achievementId.toString(),
      "icons",
      `${iconHash}${format}?size=${size}`,
    );
  },

  storePageAsset: (
    applicationId: Snowflake,
    assetId: Snowflake,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-assets", applicationId.toString(), "store", `${assetId}${format}?size=${size}`);
  },

  stickerPackBanner: (
    stickerPackBannerAssetId: Snowflake,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(
      IMAGE_BASE_URL,
      "app-assets",
      "710982414301790216",
      "store",
      `${stickerPackBannerAssetId}${format}?size=${size}`,
    );
  },

  teamIcon: (
    teamId: Snowflake,
    teamIconHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "team-icons", teamId.toString(), `${teamIconHash}${format}?size=${size}`);
  },

  sticker: (stickerId: Snowflake, format: StrictSubSet<".png" | ".json" | ".gif", ImageFormat>) => {
    validateFormat(format, [".png", ".json", ".gif"]);

    return joinURL(IMAGE_BASE_URL, "stickers", `${stickerId}${format}`);
  },

  roleIcon: (
    roleId: Snowflake,
    iconHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "role-icons", roleId.toString(), `${iconHash}${format}?size=${size}`);
  },

  guildScheduledEventCover: (
    scheduledEventId: Snowflake,
    coverImageHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "guild-events", scheduledEventId.toString(), `${coverImageHash}${format}?size=${size}`);
  },

  guildMemberBanner: (
    guildId: Snowflake,
    userId: Snowflake,
    memberBannerHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp" | ".gif", ImageFormat> = ".webp",
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
    validateSize(size);

    return joinURL(
      IMAGE_BASE_URL,
      "guilds",
      guildId.toString(),
      "users",
      userId.toString(),
      "banners",
      `${memberBannerHash}${format}?size=${size}`,
    );
  },

  guildTagBadge: (
    guildId: Snowflake,
    badgeHash: string,
    format: StrictSubSet<".png" | ".jpg" | ".jpeg" | ".webp", ImageFormat>,
    size: ImageSize,
  ) => {
    validateFormat(format, [".png", ".jpg", ".jpeg", ".webp"]);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "guild-tag-badges", guildId.toString(), `${badgeHash}${format}?size=${size}`);
  },
} as const);

export const getDefaultUserAvatarIndexByDiscriminator = (discriminator: number) => discriminator % 5;
