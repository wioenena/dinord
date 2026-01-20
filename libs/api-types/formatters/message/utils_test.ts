import { formatCustomEmoji } from "@dinord/api-types";
import { assertEquals } from "@std/assert";
import { assertThrows } from "@std/assert/throws";
import {
  type EmailAddress,
  formatChannelMention,
  formatEmailLink,
  formatGuildNavigation,
  formatPhoneLink,
  formatRoleMention,
  formatSlashCommand,
  formatUnixTimestamp,
  formatUserMention,
  type GuildNavigationTypes,
  type PhoneNumberString,
  type UnixTimestampStyles,
} from "./mod.ts";

Deno.test("formatUserMention", () => {
  const id = "123";
  assertEquals(formatUserMention(id), `<@${id}>`);
});

Deno.test("formatChannelMention", () => {
  const id = "123";
  assertEquals(formatChannelMention(id), `<#${id}>`);
});

Deno.test("formatRoleMention", () => {
  const id = "123";
  assertEquals(formatRoleMention(id), `<@&${id}>`);
});

Deno.test("formatSlashCommand", async (t) => {
  const id = "123";
  const name = "command";
  const group = "group";
  const subcommand = "subcommand";
  await t.step("With just name", () => {
    assertEquals(formatSlashCommand(id, name), `</${name}:${id}>`);
  });
  await t.step("With group but not subCommand", () => {
    assertThrows(() => {
      formatSlashCommand(id, name, group);
    });
  });
  await t.step("With all parameters", () => {
    assertEquals(formatSlashCommand(id, name, group, subcommand), `</${name} ${group} ${subcommand}:${id}>`);
  });

  await t.step("With only name and subCommand", () => {
    assertEquals(formatSlashCommand(id, name, undefined, subcommand), `</${name} ${subcommand}:${id}>`);
  });
});

Deno.test("formatCustomEmoji", async (t) => {
  const id = "123";
  const name = "emoji";
  await t.step("With no animated", () => {
    assertEquals(formatCustomEmoji(id, name, false), `<:${name}:${id}>`);
  });
  await t.step("With animated", () => {
    assertEquals(formatCustomEmoji(id, name, true), `<a:${name}:${id}>`);
  });
});

Deno.test("formatUnixTimestamp", async (t) => {
  const date = new Date();
  const expectedSeconds = Math.floor(date.getTime() / 1000);
  await t.step("Input as number (milliseconds)", () => {
    assertEquals(formatUnixTimestamp(date.getTime()), `<t:${Math.floor(expectedSeconds)}>`);
  });
  await t.step("Input as Date object", () => {
    assertEquals(formatUnixTimestamp(date), `<t:${Math.floor(expectedSeconds)}>`);
  });
  await t.step("With all styles", () => {
    const styles: UnixTimestampStyles[] = ["t", "T", "d", "D", "f", "F", "s", "S", "R"];

    styles.forEach((style) => {
      assertEquals(formatUnixTimestamp(date, style), `<t:${Math.floor(expectedSeconds)}:${style}>`);
    });
  });
});

Deno.test("formatGuildNavigation", () => {
  const id = "123";
  const types: GuildNavigationTypes[] = ["customize", "browse", "guide", "linked-roles"];
  types.forEach((type) => {
    assertEquals(formatGuildNavigation(id, type), `<${id}:${type}>`);
  });
});

Deno.test("formatPhoneLink", async (t) => {
  const phoneNumber: PhoneNumberString = "+1 (555) 123 4567";
  await t.step("With urlPrefixed", () => {
    assertEquals(formatPhoneLink(phoneNumber, true), `<tel:${phoneNumber}>`);
  });
  await t.step("Without urlPrefixed", () => {
    assertEquals(formatPhoneLink(phoneNumber, false), `<${phoneNumber}>`);
  });
});

Deno.test("formatEmailLink", async (t) => {
  const email: EmailAddress = "example@example.com";
  const query = "?subject=Message%20Title&body=Message%20Content";

  await t.step("Without query and uriPrefixed", () => {
    assertEquals(formatEmailLink(email), `<${email}>`);
  });
  await t.step("With uriPrefixed", () => {
    assertEquals(formatEmailLink(email, undefined, true), `<mailto:${email}>`);
  });
  await t.step("With query", () => {
    assertEquals(formatEmailLink(email, query), `<${email}${query}>`);
  });
  await t.step("With all parameters", () => {
    assertEquals(formatEmailLink(email, query, true), `<mailto:${email}${query}>`);
  });
});
