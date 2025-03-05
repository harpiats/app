import { Monitor } from "app/middlewares/monitor";

export default async function Show() {
	const metrics = await Monitor.getMetrics();

	return metrics;
}
