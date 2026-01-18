import { LogLevel } from "./constants.ts";

export class Logger {
	public readonly level: LogLevel;
	public readonly label: string;

	public constructor(level: LogLevel, label: string) {
		this.level = level;
		this.label = label;
	}

	public log(level: LogLevel, ...messages: unknown[]) {
		if (level >= this.level) {
			const date = new Date();
			const shortDate = date.toLocaleDateString();
			const shortTime = date.toLocaleTimeString();

			console.log(
				`${shortDate} ${shortTime} [${this.label}#${LogLevel[level].toLowerCase()}]`,
				...messages,
			);
		}
	}

	public verbose(...messages: unknown[]) {
		this.log(LogLevel.VERBOSE, ...messages);
	}

	public debug(...messages: unknown[]) {
		this.log(LogLevel.DEBUG, ...messages);
	}

	public info(...messages: unknown[]) {
		this.log(LogLevel.INFO, ...messages);
	}

	public warn(...messages: unknown[]) {
		this.log(LogLevel.WARN, ...messages);
	}

	public error(...messages: unknown[]) {
		this.log(LogLevel.ERROR, ...messages);
	}
}
