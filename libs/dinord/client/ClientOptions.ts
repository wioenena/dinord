import type { LogLevel } from "../logger/mod.ts";
import type { ShardOptionsProps } from "../shard/mod.ts";
import { defProp } from "../utils/mod.ts";

type ClientOptionsProps = {
	token: string;
	logLevel: LogLevel;
	shardOptions: ShardOptionsProps;
};

export class ClientOptions {
	public readonly token!: string;
	public readonly logLevel!: LogLevel;
	public readonly shardOptions!: ShardOptionsProps;

	public constructor({ token, logLevel, shardOptions }: ClientOptionsProps) {
		defProp(this, "token", token);
		defProp(this, "logLevel", logLevel);
		defProp(this, "shardOptions", shardOptions);
	}
}
