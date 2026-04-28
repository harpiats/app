import { Telemetry } from "app/config/telemetry";

export default async function getPageViews(date?: string) {
  return Telemetry.getPageViews({ date });
}
