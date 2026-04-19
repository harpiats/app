import { Telemetry } from "app/config/telemetry";

export default async function getErrors(date?: string) {
  return Telemetry.getErrors({ date });
}
