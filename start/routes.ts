import path from "node:path";
import { Glob } from "bun";
import { Router } from "harpiats";

const router = new Router();

const modulesDirectory = path.join(process.cwd(), "modules");
const routePattern = "**/*.routes.ts";

const routeGlob = new Glob(routePattern);
const routeFiles = routeGlob.scan({ cwd: modulesDirectory, absolute: true });

for await (const routeFile of routeFiles) {
	const module = await import(routeFile);
	const routeKey = Object.keys(module).find((key) => key.endsWith("Routes"));

	if (routeKey) {
		const routeInstance = module[routeKey];
		const prefix = routeInstance.getPrefix();

		router.register({ prefix, routes: routeInstance.list() });
	}
}

export default router;
