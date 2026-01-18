import { Client, LogLevel, RestManager, ShardManager } from "dinord";
import { type TimerCallback, TimerManager } from "../libs/dinord/timer/TimerManager.ts";

const token = Deno.env.get("TOKEN");

if (token === undefined) {
  console.error("TOKEN environment variable is not set");
  Deno.exit(1);
}

const logLevel = LogLevel.VERBOSE;

const restManager = new RestManager(logLevel, token);
const shardManager = new ShardManager(restManager, { totalShards: "auto", token, intents: 0 }, logLevel);
const client = new Client(restManager, shardManager, logLevel);

await client.start();

client.logger.debug("Client started");
