import { Telemetry } from "app/config/telemetry";

export default async function summary(date?: string, limit?: number) {
  return Telemetry.summary({ date, limit });
}
