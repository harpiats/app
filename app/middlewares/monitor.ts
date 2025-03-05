import type { NextFunction, Request, Response } from "harpiats";
import { MemoryStore } from "harpiats/memory-store";
import { RequestMonitor } from "harpiats/monitor";
import { app } from "start/server";

export const Monitor = new RequestMonitor({
  store: new MemoryStore(),
  ignore: ["favicon.ico"],
});

export const monitor = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.ENV === "test") {
    return next();
  }

  const trafficSource = {
    utm: {
      id: req.query?.utm_id,
      source: req.query?.utm_source,
      medium: req.query?.utm_medium,
      campaign: req.query?.utm_campaign,
      sourcePlatform: req.query?.utm_source_platform,
      term: req.query?.utm_term,
      content: req.query?.utm_content,
      creativeFormat: req.query?.utm_creative_format,
      marketingTactic: req.query?.utm_marketing_tactic,
    },

    referer: req.headers.get("referer") || undefined,
    userAgent: req.headers.get("User-Agent") || undefined,
  };

  Monitor.initialize(req, app.requestIP() as string, trafficSource);
  Monitor.handleRequest();

  next();
};
