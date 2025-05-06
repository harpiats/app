import { MemoryStore } from "harpiats/memory-store";
import { RequestMonitor } from "harpiats/monitor";
import { RedisStore } from "./redis";

export const Monitor = new RequestMonitor({
  store: process.env.ENV === "production" ? new RedisStore(0) : new MemoryStore(),
  ignore: ["favicon.ico"],
});
