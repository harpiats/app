import type { Store } from "@harpiats/core";
import { RedisClient } from "bun";

export class RedisStore implements Store {
  private client: RedisClient;
  private ready: Promise<void>;

  constructor(db?: number) {
    const host = process.env.REDIS_HOST || "localhost";
    const port = process.env.REDIS_PORT || "6379";
    const user = process.env.REDIS_USER || "";
    const pass = process.env.REDIS_PASS || "";
    const auth = user || pass ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@` : "";
    let url = `redis://${auth}${host}:${port}`;

    if (db !== undefined && db !== 0) {
      url = `${url.replace(/\/\d+$/, "")}/${db}`;
    }

    this.client = new RedisClient(url, {
      autoReconnect: true,
      maxRetries: 10,
      connectionTimeout: 10000,
    });

    this.client.onconnect = () => console.log("Connected to Redis");
    this.client.onclose = (err) => console.error("Redis error:", err);

    this.ready = this.client.connect();
  }

  async on(): Promise<boolean> {
    try {
      await this.ready;
      return this.client.connected;
    } catch {
      return false;
    }
  }

  async get(key: string): Promise<Record<string, any> | undefined> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : undefined;
  }

  async set(key: string, data: any): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }

  async setEx(key: string, data: any, ttlSeconds: number): Promise<void> {
    await this.client.send("SET", [key, JSON.stringify(data), "EX", String(ttlSeconds)]);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}