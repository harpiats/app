import type { Store } from "harpiats";
import Redis from "ioredis";

export class RedisStore implements Store {
  private client: Redis;

  constructor(db?: number) {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      username: process.env.REDIS_USER || "",
      password: process.env.REDIS_PASS || "",
      port: Number(process.env.REDIS_PORT) || 6379,
      db: db || 0,
      lazyConnect: true,
    });

    this.client.on("connect", () => console.log("Connected to Redis"));
    this.client.on("error", (err) => console.error("Redis error:", err));
    this.client.connect().catch((err) => console.error("Failed to connect to Redis:", err));
  }

  async on(): Promise<boolean> {
    if (this.client.on("connect", () => true)) {
      return true;
    }

    return false;
  }

  async get(key: string): Promise<Record<string, any> | undefined> {
    const data = await this.client.get(key);

    return data ? JSON.parse(data) : undefined;
  }

  async set(key: string, data: any): Promise<void> {
    await this.client.set(key, JSON.stringify(data));
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
