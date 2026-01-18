import { Logger, type LogLevel } from "../logger/mod.ts";
import type { RestManager } from "../rest/mod.ts";
import type { ShardManager } from "../shard/mod.ts";
import { defProp } from "../utils/mod.ts";

export class Client {
  public readonly logger!: Logger;
  public readonly restManager!: RestManager;
  public readonly shardManager!: ShardManager;

  public constructor(restManager: RestManager, shardManager: ShardManager, logLevel: LogLevel) {
    defProp(this, "logger", new Logger(logLevel, Client.name));
    defProp(this, "restManager", restManager);
    defProp(this, "shardManager", shardManager);
  }

  public async start(): Promise<void> {
    await this.shardManager.start();
  }

  public stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
