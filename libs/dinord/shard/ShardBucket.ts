import { assert } from "@std/assert";
import { delay } from "@std/async";
import { Collection } from "../collection/mod.ts";
import { Logger, type LogLevel } from "../logger/mod.ts";
import { isNullOrUndefined } from "../utils/mod.ts";
import { Shard } from "./Shard.ts";
import type { ShardContext } from "./ShardContext.ts";
import type { ShardId } from "./types.d.ts";

export type BucketId = number;

export class ShardBucket {
  private readonly logger: Logger;
  private readonly context: ShardContext;

  public readonly id: BucketId;
  public readonly queue: ShardId[];
  public readonly shards: Collection<ShardId, Shard>;

  public constructor(id: BucketId, context: ShardContext, logLevel: LogLevel) {
    this.id = id;
    this.context = context;
    this.logger = new Logger(logLevel, `${ShardBucket.name}(${this.id})`);
    this.queue = [];
    this.shards = new Collection();
  }

  public addShard(shardId: ShardId) {
    this.queue.push(shardId);
    this.shards.set(shardId, new Shard(shardId, this.context, this.logger.level));
  }

  public async startShards() {
    this.logger.debug("Starting shards");

    while (this.queue.length > 0) {
      const shardId = this.queue.shift();
      assert(!isNullOrUndefined(shardId));

      const shard = this.shards.get(shardId);
      assert(shard);
      await shard.start();

      if (this.queue.length > 0) {
        this.logger.debug(`Waiting 5.5s for rate limit.`);
        await delay(5500);
      }
    }

    this.logger.debug("All shards started");
  }
}
