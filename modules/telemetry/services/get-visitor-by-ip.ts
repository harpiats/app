import { Telemetry } from "app/config/telemetry";

export default async function getVisitorByIp(ip: string, date?: string) {
  return Telemetry.getVisitorByIp({ ip, date });
}
