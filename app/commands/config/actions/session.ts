import fs from "node:fs";
import path from "node:path";

import { config } from "node:process";
import { Utils, colorize } from "app/utils";
import type { TemplateEngine } from "harpiats/template-engine";

export type Props = {
  engine: TemplateEngine;
  model: string;
  identifierField: string;
};

export const session = async ({ engine, model, identifierField }: Props) => {
  const filePath = path.join(process.cwd(), "modules", "session");

  const templates = {
    config: engine.render("auth/session/config/session"),
    middleware: engine.render("auth/session/middlewares/auth"),
    route: engine.render("auth/session/module/session.routes"),
    controllers: {
      index: engine.render("auth/session/module/controllers/index"),
      store: engine.render("auth/session/module/controllers/store"),
      show: engine.render("auth/session/module/controllers/show"),
      destroy: engine.render("auth/session/module/controllers/destroy"),
    },
    services: {
      index: engine.render("auth/session/module/services/index"),
      create: engine.render("auth/session/module/services/create"),
    },
    validations: {
      index: engine.render("auth/session/module/validations/index"),
      create: engine.render("auth/session/module/validations/create", { identifierField }),
      validate: engine.render("auth/session/module/validations/validate-user", { model, identifierField }),
      checkPassword: engine.render("auth/session/module/validations/check-password"),
    },
  };

  const outputs = {
    config: path.join(process.cwd(), "app/config", "session.ts"),
    middleware: path.join(process.cwd(), "app/middlewares", "auth.ts"),
    module: {
      route: path.join(filePath, "session.routes.ts"),
      controllers: {
        index: path.join(filePath, "controllers", "index.ts"),
        store: path.join(filePath, "controllers", "store.ts"),
        show: path.join(filePath, "controllers", "show.ts"),
        delete: path.join(filePath, "controllers", "destroy.ts"),
      },
      services: {
        index: path.join(filePath, "services", "index.ts"),
        create: path.join(filePath, "services", "create.ts"),
      },
      validations: {
        index: path.join(filePath, "validations", "index.ts"),
        create: path.join(filePath, "validations", "create.ts"),
        validate: path.join(filePath, "validations", "validate-user.ts"),
        checkPassword: path.join(filePath, "validations", "check-password.ts"),
      },
    },
  };

  // Create Directory
  fs.mkdirSync(path.join(process.cwd(), "modules/session"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), "modules/session", "controllers"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), "modules/session", "services"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), "modules/session", "validations"), { recursive: true });

  // Create files
  fs.writeFileSync(outputs.config, await templates.config);
  fs.writeFileSync(outputs.middleware, await templates.middleware);
  fs.writeFileSync(outputs.module.route, await templates.route);

  fs.writeFileSync(outputs.module.controllers.index, await templates.controllers.index);
  fs.writeFileSync(outputs.module.controllers.store, await templates.controllers.store);
  fs.writeFileSync(outputs.module.controllers.show, await templates.controllers.show);
  fs.writeFileSync(outputs.module.controllers.delete, await templates.controllers.destroy);

  fs.writeFileSync(outputs.module.services.index, await templates.services.index);
  fs.writeFileSync(outputs.module.services.create, await templates.services.create);

  fs.writeFileSync(outputs.module.validations.index, await templates.validations.index);
  fs.writeFileSync(outputs.module.validations.create, await templates.validations.create);
  fs.writeFileSync(outputs.module.validations.validate, await templates.validations.validate);
  fs.writeFileSync(outputs.module.validations.checkPassword, await templates.validations.checkPassword);

  // Generated message
  const module = colorize("#FFA500", "modules/session");
  const config = colorize("#FFA500", "app/config/session.ts");
  const middleware = colorize("#FFA500", "app/middlewares/auth.ts");
  const message = `The files has been generated at ${module}, ${config} and ${middleware}.`;

  return console.log(message);
};
