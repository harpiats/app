import fs from "node:fs";
import path from "node:path";

export const hotReloadClients = new Set<Bun.ServerWebSocket<any>>();

interface HotReloadOptions {
  verbose?: boolean;
  watch?: string[];
  extensions?: string[];
}

export function startHotReload(options: HotReloadOptions = {}) {
  const {
    verbose = false,
    watch = ["./modules", "./public", "./resources"],
    extensions = [".css", ".html", ".js", ".ts"],
  } = options;

  const dirsToWatch = watch.map((dir) => path.join(process.cwd(), dir)).filter((dir) => fs.existsSync(dir));

  for (const dir of dirsToWatch) {
    try {
      fs.watch(dir, { recursive: true }, (_event, filename) => {
        if (!filename) return;

        const ext = path.extname(filename);
        if (!extensions.includes(ext)) return;

        if (verbose) {
          console.log(`[hot-reload] changed: ${filename}`);
        }

        broadcastHotReload(filename);
      });

      if (verbose) console.log(`[hot-reload] watching: ${dir}`);
    } catch (err) {
      console.error(`[hot-reload] watch error in ${dir}:`, err);
    }
  }
}

export function broadcastHotReload(file: string) {
  const payload = JSON.stringify({ type: "reload", file });

  for (const client of hotReloadClients) {
    if (client.readyState === 1) {
      client.send(payload);
    }
  }
}

export function registerHotReloadClient(ws: Bun.ServerWebSocket<any>) {
  hotReloadClients.add(ws);
}

export function unregisterHotReloadClient(ws: Bun.ServerWebSocket<any>) {
  hotReloadClients.delete(ws);
}
