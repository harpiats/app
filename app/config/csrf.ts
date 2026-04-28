import { CSRF as CSRFConfig, MemoryStore } from "@harpiats/core";
import { RedisStore } from "./redis";

export const CSRF = new CSRFConfig({
  store: process.env.ENV === "production" ? new RedisStore(1) : new MemoryStore(),
  ttl: 5 * 60 * 1000, // 5 minutes
});
