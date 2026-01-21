import { assert } from "@std/assert";
import {
  GatewayOpCode,
  type GatewayReceiveEventPayload,
  type GatewaySendEventPayload,
  type HelloEventPayload,
  type IdentifyPayload,
  WS_URL,
} from "../gateway/mod.ts";
import { Logger, type LogLevel } from "../logger/mod.ts";
import { isNullOrUndefined } from "../utils/mod.ts";
import type { ShardContext } from "./ShardContext.ts";
import type { ShardId } from "./types.d.ts";

export enum ShardState {
  Connecting,
  Connected,
  Disconnected,
}

export class Shard {
  private readonly logger: Logger;
  private readonly context: ShardContext;
  private socket?: WebSocket;
  private state: ShardState;
  private heartbeatIntervalId?: number;
  private startPromiseResolve?: () => void;
  private lastSequence: number | null;
  private lastHeartbeatAck: Date | null;
  private lastHeartbeatSent: Date | null;

  public readonly id: ShardId;

  public constructor(id: ShardId, context: ShardContext, logLevel: LogLevel) {
    this.id = id;
    this.logger = new Logger(logLevel, `${Shard.name}(${this.id})`);
    this.socket = undefined;
    this.state = ShardState.Disconnected;
    this.context = context;
    this.heartbeatIntervalId = undefined;
    this.startPromiseResolve = undefined;
    this.lastSequence = null;
    this.lastHeartbeatAck = null;
    this.lastHeartbeatSent = null;
    this.logger.debug(`Shard(${id}) created`);
  }

  public async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.startPromiseResolve = resolve;

      this.logger.debug(`Shard(${this.id}) starting`);
      this.state = ShardState.Connecting;
      this.socket = new WebSocket(WS_URL);
      this.socket.binaryType = "arraybuffer";

      this.socket.addEventListener("open", this.onOpen.bind(this));
      this.socket.addEventListener("message", this.onMessage.bind(this));
      this.socket.addEventListener("error", this.onError.bind(this));
      this.socket.addEventListener("close", this.onClose.bind(this));
    });
  }

  private onOpen(event: Event) {
    this.logger.debug(`Shard(${this.id}) connected to websocket.`);
  }

  private onMessage(event: MessageEvent<ArrayBuffer | string>) {
    if (event.data instanceof ArrayBuffer) {
      this.logger.warn("TODO: Handle binary data");
      return;
    }
    try {
      const payload: GatewayReceiveEventPayload = JSON.parse(event.data);
      this.handlePayload(payload);
    } catch (error) {
      this.logger.error(`Failed to parse gateway payload: ${error}`);
    }
  }

  private handlePayload(payload: GatewayReceiveEventPayload) {
    this.lastSequence = payload.s;
    switch (payload.op) {
      case GatewayOpCode.Dispatch:
        this.handleDispatch(payload);
        break;
      case GatewayOpCode.Heartbeat:
        this.logger.warn("GatewayOpCode.Heartbeat event unimplemented yet");
        break;
      case GatewayOpCode.Identify:
        this.logger.warn("GatewayOpCode.Identify event unimplemented yet");
        break;
      case GatewayOpCode.PresenceUpdate:
        this.logger.warn("GatewayOpCode.PresenceUpdate event unimplemented yet");
        break;
      case GatewayOpCode.VoiceStateUpdate:
        this.logger.warn("GatewayOpCode.VoiceStateUpdate event unimplemented yet");
        break;
      case GatewayOpCode.Resume:
        this.logger.warn("GatewayOpCode.Resume event unimplemented yet");
        break;
      case GatewayOpCode.Reconnect:
        this.logger.warn("GatewayOpCode.Reconnect event unimplemented yet");
        break;
      case GatewayOpCode.RequestGuildMembers:
        this.logger.warn("GatewayOpCode.RequestGuildMembers event unimplemented yet");
        break;
      case GatewayOpCode.InvalidSession:
        this.logger.warn("GatewayOpCode.InvalidSession event unimplemented yet");
        break;
      case GatewayOpCode.Hello:
        this.handleHelloEvent(payload as GatewayReceiveEventPayload<HelloEventPayload>);
        break;
      case GatewayOpCode.HeartbeatACK:
        this.handleHeartbeatAck();
        break;
      case GatewayOpCode.RequestSoundboardSounds:
        this.logger.warn("GatewayOpCode.RequestSoundboardSounds event unimplemented yet");
        break;
      default:
        this.logger.warn(`GatewayOpCode ${payload.op} event unimplemented yet`);
        break;
    }
  }

  private handleDispatch(payload: GatewayReceiveEventPayload<unknown>) {
    assert(payload.t);
    this.context.dispatchEventManager.dispatchEvent(payload.t, payload.d);
  }

  private handleHelloEvent(payload: GatewayReceiveEventPayload<HelloEventPayload>) {
    assert(!isNullOrUndefined(payload.d));
    this.initializeHearbeat(payload.d.heartbeat_interval);
    this.sendIdentify();
  }

  private initializeHearbeat(heartbeatInterval: number) {
    const jitterAmount = Math.random();
    const initialDelay = jitterAmount * heartbeatInterval;
    this.context.timerManager.setTimeout(
      () => {
        this.sendHeartbeat();

        if (!isNullOrUndefined(this.heartbeatIntervalId)) {
          this.context.timerManager.clearInterval(this.heartbeatIntervalId);
        }

        this.heartbeatIntervalId = this.context.timerManager.setInterval(
          () => {
            this.sendHeartbeat();
          },
          heartbeatInterval,
          false,
        );
      },
      initialDelay,
      false,
    );
  }

  private sendIdentify() {
    assert(this.startPromiseResolve);

    if (this.context.options.compress === true) {
      this.logger.warn("Compression is not supported yet");
    }

    if (!isNullOrUndefined(this.context.options.presence)) {
      this.logger.warn("Presence is not supported yet");
    }

    this.sendPayload<IdentifyPayload>({
      op: GatewayOpCode.Identify,
      d: {
        token: this.context.options.token,
        properties: {
          os: Deno.build.os,
          browser: "dinord",
          device: "dinord",
        },
        compress: false, // TODO: support  this
        large_threshold: this.context.options.largeThreshold ?? 50,
        shard: [this.id, this.context.totalShards],
        // TODO: support presence:
        intents: this.context.options.intents, // TODO: create utility class for managing intents
      },
    });

    this.logger.debug(`Identify sent`);
    this.startPromiseResolve();
  }

  private sendHeartbeat() {
    this.sendPayload({
      op: GatewayOpCode.Heartbeat,
      d: this.lastSequence,
    });
    this.lastHeartbeatSent = new Date();
    this.logger.debug(`Heartbeat sent`);
  }

  private sendPayload<TPayload = unknown>(payload: GatewaySendEventPayload<TPayload>) {
    assert(this.socket);
    this.socket.send(JSON.stringify(payload));
  }

  private handleHeartbeatAck() {
    this.lastHeartbeatAck = new Date();
    this.logger.debug(`Heartbeat acknowledged at ${this.lastHeartbeatAck}`);
  }

  private onError(event: Event) {
    this.logger.error(`Shard(${this.id}) websocket error: ${event}`);
    this.logger.warn("TODO: Implement error handling");
  }

  private onClose(event: CloseEvent) {
    this.logger.debug(`Shard(${this.id}) websocket closed with code ${event.code} and reason ${event.reason}`);
    this.logger.warn("TODO: Implement disconnection handling");
    this.state = ShardState.Disconnected;
  }
}
