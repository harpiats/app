import { type NextFunction, type Request, type Response, Router } from "harpiats";

export const checkCredentials = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.get("content-type")?.includes("multipart/form-data")) {
    const formData = await req.formData();
    const appId = formData.get("app_id");
    const secret = formData.get("secret");

    if (appId === process.env.APP_ID && secret === process.env.MONITOR_SECRET) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  if (req.headers.get("content-type")?.includes("application/json")) {
    const { appId, secret } = await req.json();

    if (appId === process.env.APP_ID && secret === process.env.MONITOR_SECRET) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};
