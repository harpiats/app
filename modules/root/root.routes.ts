import { type Request, type Response, Router } from "harpiats";

const rootRoutes = new Router();

rootRoutes.get("/", async (req: Request, res: Response) => {
  return res.json({
    message: "Welcome to Harpia",
  });
});

export { rootRoutes };
