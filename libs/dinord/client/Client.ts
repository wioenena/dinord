import { Logger, type LogLevel } from "../logger/mod.ts";
import type { RestManager } from "../rest/mod.ts";
import type { ShardManager } from "../shard/mod.ts";
import type { User } from "../structures/mod.ts";

export class Client {
  public readonly logger: Logger;
  public readonly restManager: RestManager;
  public readonly shardManager: ShardManager;

  public constructor(restManager: RestManager, shardManager: ShardManager, logLevel: LogLevel) {
    this.logger = new Logger(logLevel, Client.name);
    this.restManager = restManager;
    this.shardManager = shardManager;
  }

  public async start(): Promise<void> {
    await this.shardManager.start();
  }

  public stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public getUser() {
    return this.shardManager.context?.getUser() ?? null;
  }
}
