import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { TemplateEngine } from "harpiats/template-engine";

export type Props = {
  engine: TemplateEngine;
  module: string;
  name: string;
};

export const validation = async ({ engine, module, name }: Props) => {
  const moduleName = Utils.string.kebabCase(module);
  const filePath = path.join(process.cwd(), "modules", moduleName, "validations");
  const fileName = `${Utils.string.kebabCase(name.toLowerCase())}.ts`;
  const templates = {
    test: engine.render("validation/example", { name }),
  };

  const outputs = {
    test: path.join(filePath, fileName),
  };

  // Create files
  fs.writeFileSync(outputs.test, await templates.test);

  // Generated message
  const colored = colorize("#FFA500", `modules/${moduleName}/validations/${fileName}`);
  const message = `The file has been generated at ${colored}.`;

  return console.log(message);
};
