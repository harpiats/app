import type { CronJob } from "cron";

// import { firstTask } from "./first-task";

class TaskManager {
  private jobs: CronJob[];

  constructor() {
    this.jobs = [
      // firstTask,
    ];
  }

  public run() {
    for (const job of this.jobs) {
      job.start();
    }
  }
}

export const Tasks = new TaskManager();
