import type { NextFunction, Request, Response } from "harpiats";
import { MemoryStore } from "harpiats/memory-store";
import { Session } from "harpiats/session";

export const session = new Session({
  cookieName: "session_",
  store: new MemoryStore(),
});

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const userSession = await session.fromRequest(req);

  if (!userSession) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
