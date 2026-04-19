import { MemoryStore, Telemetry as HarpiaTelemetry } from "@harpia/core";
import { RedisStore } from "./redis";

export const Telemetry = new HarpiaTelemetry({
  store: process.env.ENV === "production" ? new RedisStore(0) : new MemoryStore(),
  ignore: ["favicon.ico"],
});
