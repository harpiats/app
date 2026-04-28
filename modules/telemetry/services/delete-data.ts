import { Telemetry } from "app/config/telemetry";

export default async function deleteData(date?: string, ip?: string) {
  return Telemetry.delete({ date, ip });
}
