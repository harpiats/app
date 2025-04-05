import { select } from "@inquirer/prompts";

export const option = await select({
  message: "What do you want to forge?",
  choices: [
    { name: "Module", value: "module" },
    { name: "Test", value: "test" },
    { name: "Factory", value: "factory" },
    { name: "Task", value: "task" },
    { name: "Validation", value: "validation" },
    { name: "Observer", value: "observer" },
  ],
});
