import { CronJob } from "cron";

// Define the task function
function task() {
  console.log("Task executed at:", new Date().toISOString());
}

// Create a new CronJob instance
export const firstTask = new CronJob(
  "* * * * *", // Cron expression (runs every minute)
  task, // Function to execute
  null, // Callback when the job is stopped (optional)
  false, // Auto-start? (false to prevent immediate start)
  "UTC", // Timezone (optional)
);
