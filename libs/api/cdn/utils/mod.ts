import type { Snowflake } from "@dinord/snowflake";
import { joinURL } from "@dinord/url";
import type { ArrayElement } from "@dinord/utils";
import {
  ALLOWED_SIZES,
  COMMON_IMAGE_FORMATS,
  EMOJI_IMAGE_FORMATS,
  GIF_IMAGE_FORMATS,
  IMAGE_BASE_URL,
  STICKER_IMAGE_FORMATS,
} from "../constants.ts";
import type { ImageFormat, ImageSize } from "../types.d.ts";

export const getDefaultUserAvatarIndexById = (userId: Snowflake) => {
  return Number((userId.value >> 22n) % 6n);
};

export const getDefaultUserAvatarIndexByDiscriminator = (discriminator: number) => discriminator % 5;

export const validateFormat = (format: ImageFormat, allowed: readonly ImageFormat[]) => {
  if (!allowed.includes(format)) {
    throw new Error(`Invalid format provided: "${format}". Allowed formats are: ${allowed.join(", ")}`);
  }
};

export const validateSize = (size: ImageSize) => {
  if (!ALLOWED_SIZES.has(size))
    throw new Error(`Invalid size provided: "${size}". Allowed sizes are: 16, 32, 64, 128, 256, 512, 1024, 2048, 4096`);
};

export const CdnEndpoints = Object.freeze({
  customEmoji: (emojiId: Snowflake, format: ArrayElement<typeof EMOJI_IMAGE_FORMATS>, size: ImageSize) => {
    validateFormat(format, EMOJI_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "emojis", `${emojiId}${format}?size=${size}`);
  },

  guildIcon: (guildId: Snowflake, iconHash: string, format: ArrayElement<typeof GIF_IMAGE_FORMATS>, size: ImageSize) => {
    validateFormat(format, GIF_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "icons", guildId.toString(), `${iconHash}${format}?size=${size}`);
  },

  guildSplash: (
    guildId: Snowflake,
    splashHash: string,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "splashes", guildId.toString(), `${splashHash}${format}?size=${size}`);
  },

  guildDiscoverySplash: (
    guildId: Snowflake,
    discoverySplashHash: string,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "discovery-splashes", guildId.toString(), `${discoverySplashHash}${format}?size=${size}`);
  },

  guildBanner: (guildId: Snowflake, bannerHash: string, format: ArrayElement<typeof GIF_IMAGE_FORMATS>, size: ImageSize) => {
    validateFormat(format, GIF_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "banners", guildId.toString(), `${bannerHash}${format}?size=${size}`);
  },

  userBanner: (userId: Snowflake, bannerHash: string, format: ArrayElement<typeof GIF_IMAGE_FORMATS>, size: ImageSize) => {
    validateFormat(format, GIF_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "banners", userId.toString(), `${bannerHash}${format}?size=${size}`);
  },

  defaultUserAvatar: (index: number) => joinURL(IMAGE_BASE_URL, "embed", "avatars", `${index}.png`),

  userAvatar: (userId: Snowflake, avatarHash: string, format: ArrayElement<typeof GIF_IMAGE_FORMATS>, size: ImageSize) => {
    validateFormat(format, GIF_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "avatars", userId.toString(), `${avatarHash}${format}?size=${size}`);
  },

  guildMemberAvatar: (
    guildId: Snowflake,
    userId: Snowflake,
    guildMemberAvatarHash: string,
    format: ArrayElement<typeof GIF_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, GIF_IMAGE_FORMATS);
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
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-icons", applicationId.toString(), `${iconHash}${format}?size=${size}`);
  },

  applicationCover: (
    applicationId: Snowflake,
    coverImageHash: string,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-icons", applicationId.toString(), `${coverImageHash}${format}?size=${size}`);
  },

  applicationAsset: (
    applicationId: Snowflake,
    assetId: Snowflake,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-assets", applicationId.toString(), `${assetId}${format}?size=${size}`);
  },

  achievementIcon: (
    applicationId: Snowflake,
    achievementId: number,
    iconHash: string,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
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
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "app-assets", applicationId.toString(), "store", `${assetId}${format}?size=${size}`);
  },

  stickerPackBanner: (
    stickerPackBannerAssetId: Snowflake,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
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
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "team-icons", teamId.toString(), `${teamIconHash}${format}?size=${size}`);
  },

  sticker: (stickerId: Snowflake, format: ArrayElement<typeof STICKER_IMAGE_FORMATS>) => {
    validateFormat(format, STICKER_IMAGE_FORMATS);

    return joinURL(IMAGE_BASE_URL, "stickers", `${stickerId}${format}`);
  },

  roleIcon: (roleId: Snowflake, iconHash: string, format: ArrayElement<typeof COMMON_IMAGE_FORMATS>, size: ImageSize) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "role-icons", roleId.toString(), `${iconHash}${format}?size=${size}`);
  },

  guildScheduledEventCover: (
    scheduledEventId: Snowflake,
    coverImageHash: string,
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "guild-events", scheduledEventId.toString(), `${coverImageHash}${format}?size=${size}`);
  },

  guildMemberBanner: (
    guildId: Snowflake,
    userId: Snowflake,
    memberBannerHash: string,
    format: ArrayElement<typeof GIF_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, GIF_IMAGE_FORMATS);
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
    format: ArrayElement<typeof COMMON_IMAGE_FORMATS>,
    size: ImageSize,
  ) => {
    validateFormat(format, COMMON_IMAGE_FORMATS);
    validateSize(size);

    return joinURL(IMAGE_BASE_URL, "guild-tag-badges", guildId.toString(), `${badgeHash}${format}?size=${size}`);
  },
} as const);
