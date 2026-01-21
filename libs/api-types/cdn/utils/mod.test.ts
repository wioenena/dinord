import { Snowflake } from "@dinord/snowflake";
import { joinURL } from "@dinord/url";
import { assertEquals, assertThrows } from "@std/assert";
import { IMAGE_BASE_URL } from "../constants.ts";
import { CdnEndpoints, getDefaultUserAvatarIndexByDiscriminator, getDefaultUserAvatarIndexById } from "./mod.ts";

Deno.test(getDefaultUserAvatarIndexById.name, () => {
  assertEquals(getDefaultUserAvatarIndexById(new Snowflake(1461875533708005540n)), 0);
});

Deno.test(getDefaultUserAvatarIndexByDiscriminator.name, () => {
  assertEquals(getDefaultUserAvatarIndexByDiscriminator(1234), 4);
});

const makeUrl = (...parts: string[]) => {
  return joinURL(IMAGE_BASE_URL, ...parts);
};

Deno.test("CdnEndpoints", async (t) => {
  await t.step("Unsupported format", () => {
    assertThrows(() => {
      // @ts-expect-error
      CdnEndpoints.customEmoji("123", ".json", 16);
    });
  });
  await t.step("Unsupported size", () => {
    assertThrows(() => {
      // @ts-expect-error
      CdnEndpoints.customEmoji("123", ".png", 15);
    });
  });

  await t.step(CdnEndpoints.customEmoji.name, () => {
    assertEquals(CdnEndpoints.customEmoji(new Snowflake(123n), ".png", 16), makeUrl("emojis", "123.png?size=16"));
  });

  await t.step(CdnEndpoints.guildIcon.name, () => {
    assertEquals(
      CdnEndpoints.guildIcon(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("icons", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildSplash.name, () => {
    assertEquals(
      CdnEndpoints.guildSplash(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("splashes", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildDiscoverySplash.name, () => {
    assertEquals(
      CdnEndpoints.guildDiscoverySplash(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("discovery-splashes", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildBanner.name, () => {
    assertEquals(
      CdnEndpoints.guildBanner(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("banners", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.userBanner.name, () => {
    assertEquals(
      CdnEndpoints.userBanner(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("banners", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.defaultUserAvatar.name, () => {
    assertEquals(
      CdnEndpoints.defaultUserAvatar(getDefaultUserAvatarIndexByDiscriminator(1234)),
      makeUrl("embed", "avatars", "4.png"),
    );
  });

  await t.step(CdnEndpoints.userAvatar.name, () => {
    assertEquals(
      CdnEndpoints.userAvatar(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("avatars", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildMemberAvatar.name, () => {
    assertEquals(
      CdnEndpoints.guildMemberAvatar(new Snowflake(123n), new Snowflake(456n), "hash", ".png", 16),
      makeUrl("guilds", "123", "users", "456", "avatars", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.avatarDecoration.name, () => {
    assertEquals(CdnEndpoints.avatarDecoration("hash", 16), makeUrl("avatar-decoration-presets", "hash.png?size=16"));
  });

  await t.step(CdnEndpoints.applicationIcon.name, () => {
    assertEquals(
      CdnEndpoints.applicationIcon(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("app-icons", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.applicationCover.name, () => {
    assertEquals(
      CdnEndpoints.applicationCover(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("app-icons", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.applicationAsset.name, () => {
    assertEquals(
      CdnEndpoints.applicationAsset(new Snowflake(123n), new Snowflake(456n), ".png", 16),
      makeUrl("app-assets", "123", "456.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.achievementIcon.name, () => {
    assertEquals(
      CdnEndpoints.achievementIcon(new Snowflake(123n), 1, "hash", ".png", 16),
      makeUrl("app-assets", "123", "achievements", "1", "icons", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.storePageAsset.name, () => {
    assertEquals(
      CdnEndpoints.storePageAsset(new Snowflake(123n), new Snowflake(456n), ".png", 16),
      makeUrl("app-assets", "123", "store", "456.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.stickerPackBanner.name, () => {
    assertEquals(
      CdnEndpoints.stickerPackBanner(new Snowflake(123n), ".png", 16),
      makeUrl("app-assets", "710982414301790216", "store", `123.png?size=16`),
    );
  });

  await t.step(CdnEndpoints.teamIcon.name, () => {
    assertEquals(
      CdnEndpoints.teamIcon(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("team-icons", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.sticker.name, () => {
    assertEquals(CdnEndpoints.sticker(new Snowflake(123n), ".png"), makeUrl("stickers", "123.png"));
  });

  await t.step(CdnEndpoints.roleIcon.name, () => {
    assertEquals(
      CdnEndpoints.roleIcon(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("role-icons", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildScheduledEventCover.name, () => {
    assertEquals(
      CdnEndpoints.guildScheduledEventCover(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("guild-events", "123", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildMemberBanner.name, () => {
    assertEquals(
      CdnEndpoints.guildMemberBanner(new Snowflake(123n), new Snowflake(456n), "hash", ".png", 16),
      makeUrl("guilds", "123", "users", "456", "banners", "hash.png?size=16"),
    );
  });

  await t.step(CdnEndpoints.guildTagBadge.name, () => {
    assertEquals(
      CdnEndpoints.guildTagBadge(new Snowflake(123n), "hash", ".png", 16),
      makeUrl("guild-tag-badges", "123", "hash.png?size=16"),
    );
  });
});
