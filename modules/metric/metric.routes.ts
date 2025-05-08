import { Router } from "harpiats";
import { controller } from "./controllers";
import { checkCredentials } from "./middlewares/check-credentials";

const isDevEnvironment = process.env.ENV && process.env.ENV === "development";
const metricRoutes = isDevEnvironment ? new Router("/metrics") : new Router();

metricRoutes.post("/", checkCredentials, controller.show);

export { metricRoutes };
