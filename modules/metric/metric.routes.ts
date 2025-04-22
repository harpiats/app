import { Router } from "harpiats";
import { MetricController } from "./controllers";
import { checkCredentials } from "./middlewares/check-credentials";

const isDevEnvironment = process.env.ENV && process.env.ENV === "development";
const metricRoutes = isDevEnvironment ? new Router("/metrics") : new Router();

metricRoutes.post("/", checkCredentials, MetricController.Show);

export { metricRoutes };
