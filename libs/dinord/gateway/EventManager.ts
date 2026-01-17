import type { Client } from "../Client.ts";
import type { EventHandler } from "./EventHandler.ts";
import { HelloEventHandler } from "./events/receive/Hello.ts";
import type { GatewayReceiveEventData } from "./types.d.ts";

type OpCode = number;

export enum OpCodes {
	Dispatch = 0,
	Heartbeat,
	Identify,
	PresenceUpdate,
	VoiceStateUpdate,
	Resume = 6,
	Reconnect,
	RequestGuildMembers,
	InvalidSession,
	Hello,
	HeartbeatACK,
	RequestSoundboardSounds = 31,
}

export class EventManager {
	private readonly handlers: Map<OpCode, EventHandler<unknown>>;
	private readonly client: Client;

	public constructor(client: Client) {
		this.client = client;
		this.handlers = new Map([[OpCodes.Hello, new HelloEventHandler()]]);
	}

	public manageEvent(
		eventId: number,
		eventData: GatewayReceiveEventData<unknown>,
	) {
		const handler = this.handlers.get(eventId);
		if (!handler) {
			console.log(`No handler found for event ID ${eventId}`);
			return;
		}

		handler.handle(this.client, eventData);
	}
}
