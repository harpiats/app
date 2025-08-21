import fs from "node:fs";
import path from "node:path";

import { colorize, Utils } from "app/utils";
import type { Props } from "./types/props";

export const seed = async ({ engine, name }: Props) => {
  const seedsPath = path.join("app/database/seeds");
  const fileName = `${Utils.string.kebabCase(name)}.seed.ts`;
  const templates = {
    example: engine.render("seed", { name }),
  };

  const outputs = {
    example: path.join(seedsPath, fileName),
  };

  // Create files
  fs.writeFileSync(outputs.example, await templates.example);

  // Generated message
  const colored = colorize("#FFA500", `app/database/seeds/${fileName}`);
  const message = `The file has been generated at ${colored}.`;

  return console.log(message);
};
