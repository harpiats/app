import { Telemetry } from "app/config/telemetry";

export default async function countUniqueVisitors(date?: string) {
  return Telemetry.countUniqueVisitors({ date });
}
