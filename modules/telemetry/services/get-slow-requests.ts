import { Telemetry } from "app/config/telemetry";

export default async function getSlowRequests(threshold: number, date?: string) {
  return Telemetry.getSlowRequests({ threshold, date });
}
