import { input } from "@inquirer/prompts";
import { actions } from "../actions";

import type { TemplateEngine } from "harpiats/template-engine";

const validation = async (engine: TemplateEngine) => {
  const module = await input({ message: "Module name" });
  const name = await input({ message: "Validation name" });

  return actions.validation({ engine, module, name });
};

export { validation };
