import { select } from "@inquirer/prompts";

export const getOption = async (defaultOption?: string) => {
  if (defaultOption) return defaultOption;

  return await select({
    message: "What do you want to generate?",
    choices: [
      { name: "Module", value: "module" },
      { name: "Controller", value: "controller" },
      { name: "Test", value: "test" },
      { name: "Factory", value: "factory" },
      { name: "Seed", value: "seed" },
      { name: "Task", value: "task" },
      { name: "Validation", value: "validation" },
      { name: "Observer", value: "observer" },
    ],
  });
};
