import type { NextFunction, Request, Response } from "@harpiats/core";

export const telemetryAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = process.env.TELEMETRY_API_KEY;

  if (!apiKey) {
    return res.status(503).json({ message: "Telemetry API key is not configured." });
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header." });
  }

  const token = authHeader.slice(7);

  if (token !== apiKey) {
    return res.status(403).json({ message: "Invalid API key." });
  }

  next();
};
