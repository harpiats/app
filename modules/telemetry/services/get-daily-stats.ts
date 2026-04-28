import { Telemetry } from "app/config/telemetry";

export default async function getDailyStats() {
  return Telemetry.getDailyStats();
}
