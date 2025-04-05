import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { Props } from "./types/props";

export const observer = async ({ engine, name }: Props) => {
  const factoriesPath = path.join("app/observers");
  const formattedName = Utils.string.kebabCase(name).toLowerCase();
  const fileName = `${formattedName}.observer.ts`;
  const templates = {
    example: engine.render("observer", { name }),
  };

  const outputs = {
    example: path.join(factoriesPath, fileName),
  };

  // Create files
  fs.writeFileSync(outputs.example, await templates.example);

  // Generated message
  const colored = colorize("#FFA500", `app/observers/${fileName}`);
  const message = `The file has been generated at ${colored}.`;

  return console.log(message);
};
