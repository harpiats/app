import { Telemetry } from "app/config/telemetry";

export default async function getAll() {
  return Telemetry.getAll();
}
