import { Telemetry } from "app/config/telemetry";

export default async function getTopPages(limit: number, date?: string) {
  return Telemetry.getTopPages({ limit, date });
}
