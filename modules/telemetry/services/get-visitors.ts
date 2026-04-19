import { Telemetry } from "app/config/telemetry";

export default async function getVisitors(date?: string) {
  return Telemetry.getVisitors({ date });
}
