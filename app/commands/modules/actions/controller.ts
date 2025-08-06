import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { TemplateEngine } from "harpiats/template-engine";

type Mode = "api" | "fullstack";

export type Props = {
  engine: TemplateEngine;
  module: string;
  name: string;
};

export const controller = async ({ engine, module, name }: Props) => {
  const mode: Mode = (process.env.MODE as Mode) || "api";
  const moduleName = Utils.string.kebabCase(module);

  const filePath = path.join(process.cwd(), "modules", moduleName, "controllers");
  const fileName = `${Utils.string.kebabCase(name.toLowerCase())}.ts`;
  const templates = {
    api: engine.render("controller/api/generic", { name }),
    fullstack: engine.render("controller/fullstack/generic", { module, name }),
  };

  const outputs = {
    controller: path.join(filePath, fileName),
  };

  // Create files
  if (mode === "api") {
    fs.writeFileSync(outputs.controller, await templates.api);
  } else {
    fs.writeFileSync(outputs.controller, await templates.fullstack);
  }

  // Generated message
  const colored = colorize("#FFA500", `modules/${moduleName}/controllers/${fileName}`);
  const message = `The file has been generated at ${colored}.`;

  return console.log(message);
};
