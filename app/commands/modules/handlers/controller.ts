import { input } from "@inquirer/prompts";
import { actions } from "../actions";

import type { TemplateEngine } from "harpiats/template-engine";

const controller = async (engine: TemplateEngine) => {
  const module = await input({ message: "Module name" });
  const name = await input({ message: "Controller name" });

  return actions.controller({ engine, module, name });
};

export { controller };
