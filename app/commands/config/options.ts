import { select } from "@inquirer/prompts";

export const getOption = async (defaultOption?: string) => {
  if (defaultOption) return defaultOption;

  return await select({
    message: "What do you want to configure?",
    choices: [{ name: "Auth Session", value: "session" }],
  });
};
