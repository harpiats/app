import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { Props } from "./types/props";

export const task = async ({ engine, name }: Props) => {
  const factoriesPath = path.join("app/tasks");
  const fileName = `${Utils.string.kebabCase(name.toLowerCase())}.ts`;
  const templates = {
    example: engine.render("task", { name }),
  };

  const outputs = {
    example: path.join(factoriesPath, fileName),
  };

  // Create files
  fs.writeFileSync(outputs.example, await templates.example);

  // Generated message
  const colored = colorize("#FFA500", `app/tasks/${fileName}`);
  const message = `The file has been generated at ${colored}.`;

  return console.log(message);
};
