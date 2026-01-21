import type { SnowflakeString } from "./types.d.ts";

export * from "./types.d.ts";

export class Snowflake {
  public readonly value: bigint;

  public constructor(id: bigint) {
    this.value = id;
  }

  public toString(): SnowflakeString {
    return this.value.toString() as SnowflakeString;
  }
}
