import { Logger, type LogLevel } from "../logger/mod.ts";
import { defProp } from "../utils/mod.ts";
import type { ShardId } from "./types.d.ts";

export class Shard {
  private readonly logger!: Logger;
  public readonly id!: ShardId;

  public constructor(id: ShardId, logLevel: LogLevel) {
    defProp(this, "id", id);
    defProp(this, "logger", new Logger(logLevel, `${Shard.name}(${id})`));
    this.logger.debug(`Shard(${id}) created`);
  }

  public async start(): Promise<void> {}
}
