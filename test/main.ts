import { Client } from "dinord";

const token = Deno.env.get("TOKEN");

if (token === undefined) {
	console.error("TOKEN environment variable is not set");
	Deno.exit(1);
}

const client = new Client(token);
client.login();
