import type { Client } from "../Client.ts";
import type { GatewayReceiveEventData } from "./types.d.ts";

export abstract class EventHandler<Payload> {
	public abstract handle(
		client: Client,
		data: GatewayReceiveEventData<Payload>,
	): Promise<void> | void;
}
