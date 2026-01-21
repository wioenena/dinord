import { assert } from "@std/assert";
import { Collection } from "../collection/mod.ts";
import type { GatewayBotResponse } from "../gateway/mod.ts";
import { Logger, type LogLevel } from "../logger/mod.ts";
import type { RestManager } from "../rest/mod.ts";
import { TimerManager } from "../timer/TimerManager.ts";
import { isGreaterThan, isNumber } from "../utils/mod.ts";
import { type BucketId, ShardBucket } from "./ShardBucket.ts";
import { ShardContext } from "./ShardContext.ts";
import type { ShardManagerOptions } from "./types.d.ts";

export class ShardManager {
  private readonly logger: Logger;
  private maxConcurrency?: number;
  private totalShards?: number;

  public readonly rest: RestManager;
  public readonly buckets: Collection<BucketId, ShardBucket>;
  public readonly options: ShardManagerOptions;
  public context?: ShardContext;

  public constructor(rest: RestManager, shardOptions: ShardManagerOptions, logLevel: LogLevel) {
    this.logger = new Logger(logLevel, ShardManager.name);
    this.rest = rest;
    this.buckets = new Collection();
    this.options = shardOptions;
    this.maxConcurrency = undefined;
    this.context = undefined;

    if (isNumber(this.options.totalShards) && isGreaterThan(this.options.totalShards, 0)) {
      this.totalShards = this.options.totalShards;
    } else this.totalShards = undefined;
  }

  public async start(): Promise<void> {
    const gatewayBot = await this.rest.get<GatewayBotResponse>("/gateway/bot");
    this.maxConcurrency = gatewayBot.session_start_limit.max_concurrency;

    if (this.options.totalShards === "auto") {
      this.totalShards = gatewayBot.shards;
    }

    assert(this.totalShards);
    this.context = new ShardContext(new TimerManager("ShardManager", this.logger.level), this.totalShards, this.options, this.logger.level);

    this.spawnBuckets();
    this.spawnShards();
    await this.startBuckets();
  }

  private spawnBuckets() {
    assert(this.maxConcurrency);
    assert(this.context);
    this.logger.debug("Spawning buckets");

    for (let bucketId = 0; bucketId < this.maxConcurrency; ++bucketId) {
      if (!this.buckets.has(bucketId)) {
        this.buckets.set(bucketId, new ShardBucket(bucketId, this.context, this.logger.level));
        this.logger.debug(`Bucket cache created for bucket ${bucketId}`);
      }
    }

    this.logger.debug("All buckets spawned");
  }

  private spawnShards() {
    assert(this.maxConcurrency);
    assert(this.totalShards);
    this.logger.debug(`Spawning shards`);

    for (let shardId = 0; shardId < this.totalShards; ++shardId) {
      const bucketId = shardId % this.maxConcurrency;
      const bucket = this.buckets.get(bucketId);
      assert(bucket);

      bucket.addShard(shardId);
    }

    this.logger.debug("All shards spawned");
  }

  private async startBuckets() {
    this.logger.debug("Starting shards in buckets");
    const bucketPromises = this.buckets.values().map((bucket) => bucket.startShards());
    await Promise.all(bucketPromises);
    this.logger.debug("All shards started in buckets");
  }
}
