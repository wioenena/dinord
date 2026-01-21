import { delay } from "@std/async";
import * as posix from "@std/path/posix";
import { Logger, type LogLevel } from "../logger/mod.ts";
import { isString } from "../utils/mod.ts";
import { DEFAULT_BASE_URL } from "./constants.ts";

export type RequestSearchParams = Record<string, string>;
export type RequestBody = Record<string, unknown>;

export type CreateRequestOptions = {
  method?: string;
  path: string;
  body?: RequestBody;
  searchParams?: RequestSearchParams;
};

export class RestManager {
  public readonly logger: Logger;
  public readonly token: string;
  public readonly baseURL: string;

  public constructor(logLevel: LogLevel, token: string, baseURL = DEFAULT_BASE_URL) {
    this.logger = new Logger(logLevel, RestManager.name);
    this.token = token;
    this.baseURL = baseURL;
  }

  public createRequest({ method = "GET", path, body, searchParams }: CreateRequestOptions): Request {
    if (!isString(path) || path.trim().length === 0) throw new TypeError("CreateRequest: 'path' must be a non-empty string");

    const url = new URL(posix.join(this.baseURL, path));
    if (searchParams !== undefined) {
      new URLSearchParams(searchParams).forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }

    return new Request(url, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        Authorization: `Bot ${this.token}`,
        "Content-Type": "application/json",
        "User-Agent": "dinord",
      },
    });
  }

  public async makeRequest<TResponse = Response>(request: Request): Promise<TResponse> {
    const response = await fetch(request);

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfterValue = response.headers.get("Retry-After");
        if (retryAfterValue === null) throw new Error(`Request failed with status ${response.status}`);

        const retryAfter = parseFloat(retryAfterValue);
        this.logger.debug(`Rate limit exceeded, retrying in ${retryAfter}ms`);
        await delay(retryAfter);
        return this.makeRequest(request);
      }

      throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.headers.get("Content-Type") === "application/json") {
      return response.json() as TResponse;
    }

    return response as TResponse;
  }

  public get<TResponse = Response>(path: string, searchParams?: RequestSearchParams): Promise<TResponse> {
    return this.makeRequest(this.createRequest({ path, searchParams, method: "GET" }));
  }

  public post<TResponse = Response>(path: string, body?: RequestBody, searchParams?: RequestSearchParams): Promise<TResponse> {
    return this.makeRequest(this.createRequest({ path, body, searchParams, method: "POST" }));
  }

  public put<TResponse = Response>(path: string, body?: RequestBody, searchParams?: RequestSearchParams): Promise<TResponse> {
    return this.makeRequest(this.createRequest({ path, body, searchParams, method: "PUT" }));
  }

  public delete<TResponse = Response>(path: string, searchParams?: RequestSearchParams): Promise<TResponse> {
    return this.makeRequest(this.createRequest({ path, searchParams, method: "DELETE" }));
  }

  public patch<TResponse = Response>(path: string, body?: RequestBody, searchParams?: RequestSearchParams): Promise<TResponse> {
    return this.makeRequest(this.createRequest({ path, body, searchParams, method: "PATCH" }));
  }
}
