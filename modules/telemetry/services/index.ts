import summary from "./summary";
import getAll from "./get-all";
import getDailyStats from "./get-daily-stats";
import getVisitors from "./get-visitors";
import getVisitorByIp from "./get-visitor-by-ip";
import countUniqueVisitors from "./count-unique-visitors";
import getPageViews from "./get-page-views";
import getTopPages from "./get-top-pages";
import getPageByPath from "./get-page-by-path";
import getAvgResponseTime from "./get-avg-response-time";
import getSlowRequests from "./get-slow-requests";
import getErrors from "./get-errors";
import countErrors from "./count-errors";
import getTrafficSources from "./get-traffic-sources";
import flush from "./flush";
import deleteData from "./delete-data";

export const service = {
  summary,
  getAll,
  getDailyStats,
  getVisitors,
  getVisitorByIp,
  countUniqueVisitors,
  getPageViews,
  getTopPages,
  getPageByPath,
  getAvgResponseTime,
  getSlowRequests,
  getErrors,
  countErrors,
  getTrafficSources,
  flush,
  deleteData,
};
