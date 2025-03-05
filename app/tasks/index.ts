import type { CronJob } from "cron";

import { FirstTask } from "./FirstTask";

class TaskManager {
  private jobs: CronJob[];

  constructor() {
    this.jobs = [FirstTask];
  }

  public run() {
    for (const job of this.jobs) {
      job.start();
    }
  }
}

export const Tasks = new TaskManager();
