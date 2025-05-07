import { Monitor } from "app/config/monitor";

export default async function show() {
  const metrics = await Monitor.getMetrics();

  return metrics;
}
