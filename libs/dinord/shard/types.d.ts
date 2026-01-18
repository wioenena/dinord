import type { Nullable } from "../types.d.ts";
import type { GatewayOpCode } from "./constants.ts";

export type ShardId = number;

export type ShardManagerOptions = {
  totalShards: number | "auto";
  token: string;
  compress?: boolean;
  largeThreshold?: number;
  presence?: never; // TODO: create type for presence
  intents: number;
};

export type GatewayBotResponse = {
  url: string;
  shards: number;
  session_start_limit: {
    total: number;
    remaining: number;
    reset_after: number;
    max_concurrency: number;
  };
};

export type GatewayReceiveEventPayload<T = unknown> = {
  op: GatewayOpCode;
  d: Nullable<T>;
  s: Nullable<number>;
  t: Nullable<string>;
};

export type GatewaySendEventPayload<T = unknown> = {
  op: GatewayOpCode;
  d: Nullable<T>;
};

export type HelloEventPayload = {
  heartbeat_interval: number;
};

export type IdentifyPayload = {
  token: string;
  properties: {
    os: string;
    browser: string;
    device: string;
  };
  compress?: boolean;
  large_threshold?: number;
  shard?: [number, number];
  presence?: never; // TODO: create type for presence
  intents: number;
};
