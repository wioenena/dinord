import type { Client } from "../../../Client.ts";
import { asyncSleep } from "../../../utils/mod.ts";
import { EventHandler } from "../../EventHandler.ts";
import { OpCodes } from "../../EventManager.ts";
import type { GatewayReceiveEventData } from "../../types.d.ts";

export interface HelloEventPayload {
	heartbeat_interval: number;
}

export interface IdentifyPayload {
	token: string;
	properties: {
		os: string;
		browser: string;
		device: string;
	};
	compress?: boolean;
	large_threshold?: number;
	shard?: [number, number];
	presence?: never; // TODO: Implement presence
	intents: number;
}

export class HelloEventHandler extends EventHandler<HelloEventPayload> {
	public override async handle(
		client: Client,
		data: GatewayReceiveEventData<HelloEventPayload>,
	): Promise<void> {
		const { d } = data;
		if (d == null || d === undefined) {
			console.log("Invalid data received");
			return;
		}

		const { heartbeat_interval } = d;
		const jitter = Math.random();
		const initialDelay = heartbeat_interval * jitter;
		console.log(
			`Initial delay: ${initialDelay}ms, Heartbeat interval: ${heartbeat_interval}ms`,
		);
		this.sendIdentify(client);
		await asyncSleep(initialDelay);
		this.sendHeartbeat(client);
		this.initializeHeartbeatLoop(client, heartbeat_interval);
	}

	private sendHeartbeat(client: Client) {
		client.send({
			op: OpCodes.Heartbeat,
			d: null, // TODO: Implement last sequence number
		});
		console.log("Heartbeat sent");
	}

	private initializeHeartbeatLoop(client: Client, heartbeatInterval: number) {
		Deno.unrefTimer(
			setInterval(() => {
				this.sendHeartbeat(client);
			}, heartbeatInterval),
		);
	}

	private sendIdentify(client: Client) {
		const { os, arch } = Deno.build;
		client.send<IdentifyPayload>({
			op: OpCodes.Identify,
			d: {
				token: client.token,
				properties: {
					os: `${os}-${arch}`,
					browser: "dinord",
					device: "dinord",
				},
				intents: 1 << 0,
			},
		});
	}
}
