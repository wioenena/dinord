import { Client, ClientOptions, LogLevel } from "dinord";

const token = Deno.env.get("TOKEN");

if (token === undefined) {
  console.error("TOKEN environment variable is not set");
  Deno.exit(1);
}

const options = new ClientOptions({
  token,
  shardOptions: {
    totalShards: "auto",
  },
  logLevel: LogLevel.VERBOSE,
});
const client = new Client(options);

await client.start();
