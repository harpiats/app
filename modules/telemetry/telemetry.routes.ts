import { Router } from "@harpiats/core";
import { controller } from "./controllers";
import { telemetryAuth } from "./middlewares/auth";

const telemetryRoutes = new Router("/telemetry");

telemetryRoutes.get("/", telemetryAuth, controller.summary);
telemetryRoutes.get("/all", telemetryAuth, controller.getAll);
telemetryRoutes.get("/daily-stats", telemetryAuth, controller.getDailyStats);

telemetryRoutes.get("/visitors", telemetryAuth, controller.getVisitors);
telemetryRoutes.get("/visitors/count", telemetryAuth, controller.countUniqueVisitors);
telemetryRoutes.get("/visitors/:ip", telemetryAuth, controller.getVisitorByIp);

telemetryRoutes.get("/pages/views", telemetryAuth, controller.getPageViews);
telemetryRoutes.get("/pages/top", telemetryAuth, controller.getTopPages);
telemetryRoutes.get("/pages/:path", telemetryAuth, controller.getPageByPath);

telemetryRoutes.get("/performance/avg-response-time", telemetryAuth, controller.getAvgResponseTime);
telemetryRoutes.get("/performance/slow-requests", telemetryAuth, controller.getSlowRequests);

telemetryRoutes.get("/errors", telemetryAuth, controller.getErrors);
telemetryRoutes.get("/errors/count", telemetryAuth, controller.countErrors);

telemetryRoutes.get("/traffic-sources", telemetryAuth, controller.getTrafficSources);

telemetryRoutes.delete("/flush", telemetryAuth, controller.flush);
telemetryRoutes.delete("/data", telemetryAuth, controller.deleteData);

export { telemetryRoutes };
