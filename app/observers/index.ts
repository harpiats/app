import path from "node:path";
import { observer } from "app/database";
import { Glob } from "bun";

class ObserverManager {
  private files: string[] = [];
  private observersDirectory = path.join(process.cwd(), "app", "observers");
  private pattern = "**/*.observer.ts";

  /**
   * Set an observer for a specific model and operation
   * @param model - The model name
   * @param operation - The Prisma operation
   * @param callback - The callback function to execute
   */
  public model(...args: Parameters<typeof observer.set>) {
    observer.set(...args);
  }

  public async run() {
    const glob = new Glob(this.pattern);
    const filesIterator = glob.scan({ cwd: this.observersDirectory, absolute: true });

    for await (const file of filesIterator) {
      this.files.push(file);
      await import(file);
    }
  }
}

export const Observer = new ObserverManager();
