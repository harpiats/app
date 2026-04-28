import { Telemetry } from "app/config/telemetry";

export default async function getPageByPath(path: string, date?: string) {
  return Telemetry.getPageByPath({ path, date });
}
