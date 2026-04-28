import { Telemetry } from "app/config/telemetry";

export default async function getTrafficSources(date?: string, source?: string) {
  return Telemetry.getTrafficSources({ date, source });
}
