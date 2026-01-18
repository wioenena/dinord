export const WS_URL = "wss://gateway.discord.gg/?v=10&encoding=json";

export enum GatewayOpCode {
  Dispatch,
  Heartbeat,
  Identify,
  PresenceUpdate,
  VoiceStateUpdate,
  Resume = 6,
  Reconnect,
  RequestGuildMembers,
  InvalidSession,
  Hello,
  HeartbeatACK,
  RequestSoundboardSounds = 31,
}
