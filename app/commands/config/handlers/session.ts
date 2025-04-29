import { input } from "@inquirer/prompts";
import { actions } from "../actions";

import type { TemplateEngine } from "harpiats/template-engine";

const session = async (engine: TemplateEngine) => {
  const model = await input({
    message: "Which model contains the login information? (e.g., User)",
    default: "User",
  });

  const identifierField = await input({
    message: "Which field will be used for login? (e.g., email, username, document)",
    default: "email",
  });

  return actions.session({ engine, model, identifierField });
};

export { session };
