import type { Nullable } from "../types.d.ts";

export interface GatewayReceiveEventData<Payload> {
	op: number;
	d: Nullable<Payload>;
	s: Nullable<number>;
	t: Nullable<string>;
}

export interface GatewaySendEventData<Payload> {
	op: number;
	d: Nullable<Payload>;
}
