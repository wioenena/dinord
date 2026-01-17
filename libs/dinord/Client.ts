import { EventManager } from "./gateway/EventManager.ts";
import type {
	GatewayReceiveEventData,
	GatewaySendEventData,
} from "./gateway/types.d.ts";
import type { Nullable } from "./types.d.ts";

const WS_URL = "wss://gateway.discord.gg/?v=10&encoding=json";

export class Client {
	public readonly token: string;
	private readonly eventManager: EventManager;
	private socket: Nullable<WebSocket>;

	public constructor(token: string) {
		this.token = token;
		this.eventManager = new EventManager(this);
		this.socket = null;
	}

	public async login(): Promise<void> {
		this.socket = new WebSocket(WS_URL);
		this.socket.addEventListener("open", this.onOpen.bind(this));
		this.socket.addEventListener("message", this.onMessage.bind(this));
		this.socket.addEventListener("error", this.onError.bind(this));
		this.socket.addEventListener("close", this.onClose.bind(this));
	}

	private onOpen() {
		console.log("WebSocket connection opened");
	}

	private onMessage(event: MessageEvent) {
		const eventData: GatewayReceiveEventData<unknown> = JSON.parse(event.data);
		this.eventManager.manageEvent(eventData.op, eventData);
	}

	private onError(event: Event) {
		console.log("WebSocket error:", event);
	}

	private onClose(event: CloseEvent) {
		console.log("WebSocket connection closed");
	}

	public send<Payload = unknown>(data: GatewaySendEventData<Payload>) {
		if (this.socket === null) {
			console.log("WebSocket is not connected"); // TODO: Handle this case
			return;
		}
		this.socket.send(JSON.stringify(data));
	}
}
