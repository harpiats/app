import { MemoryStore, RequestMonitor } from "@harpia/core";
import { RedisStore } from "./redis";

export const Monitor = new RequestMonitor({
  store: process.env.ENV === "production" ? new RedisStore(0) : new MemoryStore(),
  ignore: ["favicon.ico"],
});
