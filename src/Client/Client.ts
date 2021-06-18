import { EventEmitter } from "../../deps.ts";
import { ClientOptions } from "../Types/ClientTypes.ts";
import { WebSocketClient } from "./WebSocket/WebSocketClient.ts";

export class Client extends EventEmitter {
    /**
     *
     * The options for client.
     * @private
     * @type {ClientOptions}
     * @memberof Client
     */
    private options: ClientOptions;

    /**
     *
     * The class to connect to the API.
     * @private
     * @type {WebSocketClient}
     * @memberof Client
     */
    private ws: WebSocketClient = new WebSocketClient(this);

    /**
     *
     * The token for client.
     * @private
     * @type {(string|null)}
     * @memberof Client
     */
    private token: string | null | undefined = null;

    /**
     * Creates an instance of Client.
     * @param {ClientOptions} [options]
     * @memberof Client
     */
    public constructor(options: ClientOptions = {}) {
        super();
        this.options = { ...options };

        if (typeof this.options.token !== "undefined")
            this.token = options.token;
    }

    /**
     *
     * The client logs in.
     * @memberof Client
     */
    public async login(token?: string) {
        if (
            this.token === null ||
            this.token === undefined ||
            !this.token ||
            typeof this.token !== "string"
        ) {
            this.token = token;
        }

        if (!this.token) {
            throw new Error("Token invalid.");
        }
        await this.ws.connect();
    }

    public get getToken() {
        return this.token;
    }
}