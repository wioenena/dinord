import type { SnowflakeString } from "@dinord/snowflake";

export type UserMention = `<@${SnowflakeString}>`;
export type UserMentionDeprecated = `<@!${SnowflakeString}>`;
export type ChannelMention = `<#${SnowflakeString}>`;
export type RoleMention = `<@&${SnowflakeString}>`;

export type SlashCommandName = string;
export type RootSlashCommand = `</${SlashCommandName}:${SnowflakeString}>`;
export type SubSlashCommand = `</${SlashCommandName} ${SlashCommandName}:${SnowflakeString}>`;
export type SubSlashCommandGroup = `</${SlashCommandName} ${SlashCommandName} ${SlashCommandName}:${SnowflakeString}>`;

export type SlashCommand = RootSlashCommand | SubSlashCommand | SubSlashCommandGroup;

export type StandardEmoji = string;

export type EmojiName = string;
export type CustomEmojiNoAnimated = `<:${EmojiName}:${SnowflakeString}>`;
export type CustomEmojiAnimated = `<a:${EmojiName}:${SnowflakeString}>`;
export type CustomEmoji = CustomEmojiNoAnimated | CustomEmojiAnimated;

export type UnixTimestampUnstyled = `<t:${number}>`;
export type UnixTimestampStyles = "t" | "T" | "d" | "D" | "f" | "F" | "s" | "S" | "R";
export type UnixTimestampStyled = `<t:${number}:${UnixTimestampStyles}>`;
export type UnixTimestamp = UnixTimestampUnstyled | UnixTimestampStyled;

export type GuildNavigationTypes = "customize" | "browse" | "guide" | "linked-roles";
export type GuildNavigation = `<${SnowflakeString}:${GuildNavigationTypes}>`;

export type EmailAddress = `${string}@${string}`;
export type PhoneNumberString = `+${string}`;

export type SimplePhoneLink = `<${PhoneNumberString}>`;
export type URIPrefixedPhoneLink = `<tel:${PhoneNumberString}>`;
export type PhoneLink = SimplePhoneLink | URIPrefixedPhoneLink;

export type SimpleEmailLink = `<${EmailAddress}>`;
export type URIPrefixedEmailLink = `<mailto:${EmailAddress}>`;

export type EmailQuery = `?${string}`;

export type EmailWithHeaders = `<${EmailAddress}${EmailQuery}>`;
export type URIPrefixedEmailWithHeaders = `<mailto:${EmailAddress}${EmailQuery}>`;

export type EmailLink = SimpleEmailLink | URIPrefixedEmailLink | EmailWithHeaders | URIPrefixedEmailWithHeaders;
