import { HotReloadManager, type HotReloadInterface } from "@harpia/common";

export const HotReloadOptions: HotReloadInterface = {
  verbose: false,
  watch: ["./modules", "./public", "./resources"],
  extensions: [".css", ".html", ".js", ".ts"],
};

export const HotReload = new HotReloadManager(HotReloadOptions);
