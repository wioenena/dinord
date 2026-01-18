import { assert } from "@std/assert";
import { Collection } from "../collection/mod.ts";
import { Logger, type LogLevel } from "../logger/mod.ts";
import type { RestManager } from "../rest/mod.ts";
import type { Nullable } from "../types.d.ts";
import { defProp, isGreaterThan, isNull, isNumber } from "../utils/mod.ts";
import { type BucketId, ShardBucket } from "./ShardBucket.ts";
import type { GatewayBotResponse, ShardOptionsProps } from "./types.d.ts";

export class ShardManager {
  public readonly logger!: Logger;
  public readonly rest!: RestManager;
  public readonly buckets!: Collection<BucketId, ShardBucket>;
  public readonly options!: ShardOptionsProps;
  private maxConcurrency!: Nullable<number>;
  private totalShards!: Nullable<number>;

  public constructor(rest: RestManager, shardOptions: ShardOptionsProps, logLevel: LogLevel) {
    defProp(this, "logger", new Logger(logLevel, ShardManager.name));
    defProp(this, "rest", rest);
    defProp(this, "buckets", new Collection());
    defProp(this, "options", shardOptions);
    defProp(this, "maxConcurrency", null, { writable: true });

    if (isNumber(this.options.totalShards) && isGreaterThan(this.options.totalShards, 0)) {
      defProp(this, "totalShards", this.options.totalShards, { writable: true });
    } else defProp(this, "totalShards", null, { writable: true });
  }

  public async start(): Promise<void> {
    const gatewayBot = await this.rest.get<GatewayBotResponse>("/gateway/bot");
    this.maxConcurrency = gatewayBot.session_start_limit.max_concurrency;

    if (this.options.totalShards === "auto" || isNull(this.totalShards)) {
      this.totalShards = gatewayBot.shards;
    }

    this.spawnBuckets();
    this.spawnShards();
    await this.startBuckets();
  }

  private spawnBuckets() {
    assert(this.maxConcurrency);
    this.logger.debug("Spawning buckets");

    for (let bucketId = 0; bucketId < this.maxConcurrency; ++bucketId) {
      if (!this.buckets.has(bucketId)) {
        this.buckets.set(bucketId, new ShardBucket(bucketId, this.logger.level));
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
    this.logger.debug("All shards started in buckets started");
  }
}
