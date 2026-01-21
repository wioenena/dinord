import type { Snowflake } from "@dinord/snowflake";
import { isNullOrUndefined } from "@dinord/utils";
import type {
  ChannelMention,
  CustomEmoji,
  EmailAddress,
  EmailLink,
  EmailQuery,
  EmojiName,
  GuildNavigation,
  GuildNavigationTypes,
  PhoneLink,
  PhoneNumberString,
  RoleMention,
  SlashCommand,
  SlashCommandName,
  UnixTimestamp,
  UnixTimestampStyles,
  UserMention,
} from "./types.d.ts";

export const formatUserMention = (id: Snowflake): UserMention => `<@${id.value}>`;

export const formatChannelMention = (id: Snowflake): ChannelMention => `<#${id.value}>`;

export const formatRoleMention = (id: Snowflake): RoleMention => `<@&${id.value}>`;

export const formatSlashCommand = (
  id: Snowflake,
  name: SlashCommandName,
  subCommandGroup?: SlashCommandName,
  subCommand?: SlashCommandName,
): SlashCommand => {
  if (!isNullOrUndefined(subCommandGroup) && isNullOrUndefined(subCommand)) {
    throw new Error("Subcommand group provided without subcommand");
  }

  if (!isNullOrUndefined(subCommandGroup) && !isNullOrUndefined(subCommand))
    return `</${name} ${subCommandGroup.trim()} ${subCommand.trim()}:${id.value}>`;
  if (!isNullOrUndefined(subCommand)) return `</${name.trim()} ${subCommand.trim()}:${id.value}>`;
  return `</${name.trim()}:${id.value}>`;
};

export const formatCustomEmoji = (id: Snowflake, name: EmojiName, animated?: boolean): CustomEmoji =>
  `<${animated === true ? "a" : ""}:${name}:${id.value}>`;

export const formatUnixTimestamp = (dateOrTimestamp: Date | number, style?: UnixTimestampStyles): UnixTimestamp => {
  const seconds = Math.floor((dateOrTimestamp instanceof Date ? dateOrTimestamp.getTime() : dateOrTimestamp) / 1000);
  if (!isNullOrUndefined(style)) return `<t:${seconds}:${style.trim() as UnixTimestampStyles}>`;

  return `<t:${seconds}>`;
};

export const formatGuildNavigation = (id: Snowflake, type: GuildNavigationTypes): GuildNavigation => `<${id.value}:${type}>`;

export const formatPhoneLink = (phoneNumber: PhoneNumberString, uriPrefixed?: boolean): PhoneLink => {
  const prefix = uriPrefixed === true ? "tel:" : "";
  return `<${prefix}${phoneNumber.trim() as PhoneNumberString}>`;
};

export const formatEmailLink = (emailAddress: EmailAddress, query?: EmailQuery, uriPrefixed?: boolean): EmailLink => {
  const prefix = uriPrefixed === true ? "mailto:" : "";
  const queryParam = !isNullOrUndefined(query) ? query.trim() : "";
  return `<${prefix}${emailAddress.trim() as EmailAddress}${queryParam}>`;
};
