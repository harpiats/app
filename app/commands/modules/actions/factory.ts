import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { Props } from "./types/props";

export const factory = async ({ engine, name }: Props) => {
  const factoriesPath = path.join("app/database/factories");
  const fileName = `${Utils.string.pascalCase(name)}.ts`;
  const templates = {
    example: engine.render("factory", { name }),
  };

  const outputs = {
    example: path.join(factoriesPath, fileName),
  };

  // Create files
  fs.writeFileSync(outputs.example, await templates.example);

  // Generated message
  const colored = colorize("#FFA500", `app/database/factories/${fileName}`);
  const message = `The file has been generated at ${colored}.`;

  return console.log(message);
};
