import path from "node:path";
import fs from "node:fs";
import { HotReloadOptions } from "app/config/hot-reload";

export interface HotReloadInterface {
  verbose?: boolean;
  watch?: string[];
  extensions?: string[];
}

export class HotReloadManager {
  private verbose: boolean;
  private watch: string[];
  private extensions: string[];
  private clients = new Set<Bun.ServerWebSocket<any>>();

  public constructor(options: HotReloadInterface = {}) {
    this.verbose = options.verbose ?? false;
    this.watch = options.watch ?? ["./modules", "./public", "./resources"];
    this.extensions = options.extensions ?? [".css", ".html", ".js", ".ts"];
  }

  private broadcast(file: string): void {
    const payload = JSON.stringify({ type: "reload", file });

    for (const client of this.clients) {
      if (client.readyState === 1) {
        client.send(payload);
      }
    }
  }

  public run(): void {
    const dirsToWatch = this.watch.map((dir) => path.join(process.cwd(), dir)).filter((dir) => fs.existsSync(dir));

    for (const dir of dirsToWatch) {
      try {
        fs.watch(dir, { recursive: true }, (_event, filename) => {
          if (!filename) return;

          const ext = path.extname(filename);
          if (!this.extensions.includes(ext)) return;

          if (this.verbose) {
            console.log(`[hot-reload] changed: ${filename}`);
          }

          this.broadcast(filename);
        });

        if (this.verbose) console.log(`[hot-reload] watching: ${dir}`);
      } catch (err) {
        console.error(`[hot-reload] watch error in ${dir}:`, err);
      }
    }
  }

  public register(client: Bun.ServerWebSocket<any>): void {
    this.clients.add(client);
  }

  public unregister(client: Bun.ServerWebSocket<any>): void {
    this.clients.delete(client);
  }
}

export const HotReload = new HotReloadManager(HotReloadOptions);
