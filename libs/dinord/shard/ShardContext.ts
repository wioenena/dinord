import type { TimerManager } from "../timer/TimerManager.ts";
import { defProp } from "../utils/mod.ts";
import type { ShardManagerOptions } from "./types.d.ts";

export class ShardContext {
  public readonly timerManager!: TimerManager;
  public readonly totalShards!: number;
  public readonly options!: ShardManagerOptions;

  public constructor(timerManager: TimerManager, totalShards: number, options: ShardManagerOptions) {
    defProp(this, "timerManager", timerManager);
    defProp(this, "totalShards", totalShards);
    defProp(this, "options", options);
  }
}
