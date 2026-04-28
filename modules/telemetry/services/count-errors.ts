import { Telemetry } from "app/config/telemetry";

export default async function countErrors(date?: string) {
  return Telemetry.countErrors({ date });
}
