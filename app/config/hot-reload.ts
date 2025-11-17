import type { HotReloadInterface } from "app/lib/hot-reload";

export const HotReloadOptions: HotReloadInterface = {
  verbose: false,
  watch: ["./modules", "./public", "./resources"],
  extensions: [".css", ".html", ".js", ".ts"],
};
