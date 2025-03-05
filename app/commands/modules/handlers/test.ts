import { input } from "@inquirer/prompts";
import { actions } from "../actions";

import type { TemplateEngine } from "harpiats/template-engine";

const test = async (engine: TemplateEngine) => {
  const module = await input({ message: "Module name" });
  const name = await input({ message: "Test name" });

  return actions.test({ engine, module, name });
};

export { test };
