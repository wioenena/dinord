import { Client, LogLevel, RestManager, ShardManager } from "dinord";
import { GatewayIntents } from "../libs/dinord/gateway/mod.ts";

const token = Deno.env.get("TOKEN");

if (token === undefined) {
  console.error("TOKEN environment variable is not set");
  Deno.exit(1);
}

const logLevel = LogLevel.VERBOSE;

const allIntents = Object.values(GatewayIntents).reduce((acc, value) => acc | value, 0);

const restManager = new RestManager(logLevel, token);
const shardManager = new ShardManager(restManager, { totalShards: "auto", token, intents: allIntents }, logLevel);
const client = new Client(restManager, shardManager, logLevel);

await client.start();

client.logger.debug("Client started");
