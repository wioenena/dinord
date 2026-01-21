import { Collection } from "../collection/mod.ts";
import type { Snowflake } from "../gateway/mod.ts";
import type { LogLevel } from "../logger/mod.ts";
import type { User } from "../structures/mod.ts";
import type { TimerManager } from "../timer/TimerManager.ts";
import { DispatchEventManager } from "./events/mod.ts";
import type { ShardManagerOptions } from "./types.d.ts";

export class ShardContext {
  private user: User | null;
  private readonly users: Collection<Snowflake, User>;

  public readonly logLevel: LogLevel;
  public readonly timerManager: TimerManager;
  public readonly totalShards: number;
  public readonly options: ShardManagerOptions;
  public readonly dispatchEventManager: DispatchEventManager;

  public constructor(timerManager: TimerManager, totalShards: number, options: ShardManagerOptions, logLevel: LogLevel) {
    this.user = null;
    this.users = new Collection();
    this.logLevel = logLevel;
    this.timerManager = timerManager;
    this.totalShards = totalShards;
    this.options = options;
    this.dispatchEventManager = new DispatchEventManager(this);
  }

  public getUser() {
    return this.user;
  }

  public getUsers() {
    return this.users;
  }

  public setUser(user: User) {
    this.user = user;
    return this;
  }
}
