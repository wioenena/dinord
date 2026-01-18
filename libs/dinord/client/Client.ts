import { Logger } from "../logger/mod.ts";
import { RestManager } from "../rest/mod.ts";
import { ShardManager } from "../shard/mod.ts";
import { defProp } from "../utils/mod.ts";
import type { ClientOptions } from "./ClientOptions.ts";

export class Client {
  public readonly options!: ClientOptions;
  public readonly logger!: Logger;
  public readonly restManager!: RestManager;
  public readonly shardManager!: ShardManager;

  public constructor(options: ClientOptions) {
    defProp(this, "options", options);
    defProp(this, "logger", new Logger(options.logLevel, Client.name));
    defProp(this, "restManager", new RestManager(this.logger.level, this.options.token));
    defProp(
      this,
      "shardManager",
      new ShardManager(this.restManager, this.options.shardOptions, this.logger.level),
    );
  }

  public async start(): Promise<void> {
    await this.shardManager.start();
  }

  public stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
