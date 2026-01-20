import type { Snowflake } from "../../types.d.ts";

export type UserMention = `<@${Snowflake}>`;
export type UserMentionDeprecated = `<@!${Snowflake}>`;
export type ChannelMention = `<#${Snowflake}>`;
export type RoleMention = `<@&${Snowflake}>`;

export type SlashCommandName = string;
export type RootSlashCommand = `</${SlashCommandName}:${Snowflake}>`;
export type SubSlashCommand = `</${SlashCommandName} ${SlashCommandName}:${Snowflake}>`;
export type SubSlashCommandGroup = `</${SlashCommandName} ${SlashCommandName} ${SlashCommandName}:${Snowflake}>`;

export type SlashCommand = RootSlashCommand | SubSlashCommand | SubSlashCommandGroup;

export type StandardEmoji = string;

export type EmojiName = string;
export type CustomEmojiNoAnimated = `<:${EmojiName}:${Snowflake}>`;
export type CustomEmojiAnimated = `<a:${EmojiName}:${Snowflake}>`;
export type CustomEmoji = CustomEmojiNoAnimated | CustomEmojiAnimated;

export type UnixTimestampUnstyled = `<t:${number}>`;
export type UnixTimestampStyles = "t" | "T" | "d" | "D" | "f" | "F" | "s" | "S" | "R";
export type UnixTimestampStyled = `<t:${number}:${UnixTimestampStyles}>`;
export type UnixTimestamp = UnixTimestampUnstyled | UnixTimestampStyled;

export type GuildNavigationTypes = "customize" | "browse" | "guide" | "linked-roles";
export type GuildNavigation = `<${Snowflake}:${GuildNavigationTypes}>`;

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
