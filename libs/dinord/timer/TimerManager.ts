import { Logger, type LogLevel } from "../logger/mod.ts";
import { defProp } from "../utils/mod.ts";

export type TimerCallback = (...args: unknown[]) => void;

export class TimerManager {
  private logger!: Logger;
  private readonly timeouts!: Set<number>;
  private readonly intervals!: Set<number>;

  public constructor(moduleName: string, logLevel: LogLevel) {
    defProp(this, "logger", new Logger(logLevel, `TimerManager(${moduleName})`));
    defProp(this, "timeouts", new Set());
    defProp(this, "intervals", new Set());
  }

  public setTimeout(callback: TimerCallback, delay: number, unref = false, ...args: unknown[]) {
    const id = setTimeout(() => {
      this.logger.verbose(`Timeout ${id} triggered`);
      this.timeouts.delete(id);
      callback(...args);
    }, delay);

    if (unref) this.unref(id);
    this.timeouts.add(id);
    return id;
  }

  public clearTimeout(id: number) {
    if (this.timeouts.delete(id)) clearTimeout(id);
  }

  public setInterval(callback: TimerCallback, delay: number, unref = false, ...args: unknown[]) {
    const id = setInterval(() => {
      this.logger.verbose(`Interval ${id} triggered`);
      callback(...args);
    }, delay);

    if (unref) this.unref(id);
    this.intervals.add(id);
    return id;
  }

  public clearInterval(id: number) {
    if (this.intervals.delete(id)) clearInterval(id);
  }

  private unref(id: number) {
    try {
      Deno.unrefTimer(id);
    } catch (error) {
      this.logger.error(`Failed to unref timer ${id}: ${(error as Error).message}`);
    }
  }

  public destroy() {
    this.timeouts.forEach((id) => {
      clearTimeout(id);
    });
    this.timeouts.clear();

    this.intervals.forEach((id) => {
      clearInterval(id);
    });
    this.intervals.clear();
  }
}
