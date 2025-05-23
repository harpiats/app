import { type Request, type Response, Router } from "harpiats";

const rootRoutes = new Router();

rootRoutes.get("/", async (req: Request, res: Response) => {
  return res.json({
    message: "Welcome to Harpia",
  });
});

rootRoutes.get("/healthcheck", (req, res) => {
  res.status(200).json({
    status: "OK",
    version: Bun.version,
    timestamp: new Date().toISOString(),
  });
});

export { rootRoutes };
