export type ShardId = number;

export type ShardManagerOptions = {
  totalShards: number | "auto";
  token: string;
  compress?: boolean;
  largeThreshold?: number;
  presence?: never; // TODO: create type for presence
  intents: number;
};
