import { Telemetry } from "app/config/telemetry";

export default async function flush() {
  return Telemetry.flush();
}
