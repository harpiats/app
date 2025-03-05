import { input } from "@inquirer/prompts";
import { actions } from "../actions";

import type { TemplateEngine } from "harpiats/template-engine";

const factory = async (engine: TemplateEngine) => {
  const name = await input({
    message: "Factory name (Use a model name)",
  });

  return actions.factory({ engine, name });
};

export { factory };
