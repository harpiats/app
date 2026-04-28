import { Telemetry } from "app/config/telemetry";

export default async function getAvgResponseTime(date?: string) {
  return Telemetry.getAvgResponseTime({ date });
}
