import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { Props } from "./types/props";

type Mode = "api" | "fullstack";

export const module = async ({ engine, name }: Props) => {
  const moduleBasePath = path.join("modules");
  const mode: Mode = (process.env.MODE as Mode) || "api";

  const pathParts = name.split("/");
  const moduleName = Utils.string.camelCase(pathParts.pop() || name);
  const moduleWrapper = pathParts.slice(0, -1).join("/") || name;
  const moduleDir = pathParts.slice(0, -1).join("/")
    ? path.join(moduleWrapper, Utils.string.kebabCase(moduleName))
    : Utils.string.kebabCase(moduleName);

  const templates = {
    controller: {
      api: {
        index: engine.render("controller/api/index", { name: moduleName }),
        store: engine.render("controller/api/store", { name: moduleName }),
        update: engine.render("controller/api/update", { name: moduleName }),
        show: engine.render("controller/api/show", { name: moduleName }),
        list: engine.render("controller/api/list", { name: moduleName }),
        destroy: engine.render("controller/api/destroy", { name: moduleName }),
      },
      fullstack: {
        index: engine.render("controller/fullstack/index", { name: moduleName }),
        create: engine.render("controller/fullstack/create", { name: moduleName }),
        store: engine.render("controller/fullstack/store", { name: moduleName }),
        edit: engine.render("controller/fullstack/edit", { name: moduleName }),
        update: engine.render("controller/fullstack/update", { name: moduleName }),
        show: engine.render("controller/fullstack/show", { name: moduleName }),
        list: engine.render("controller/fullstack/list", { name: moduleName }),
        destroy: engine.render("controller/fullstack/destroy", { name: moduleName }),
      },
    },
    service: {
      index: engine.render("service/index", { name: moduleName }),
      create: engine.render("service/create", { name: moduleName }),
      update: engine.render("service/update", { name: moduleName }),
      show: engine.render("service/show", { name: moduleName }),
      list: engine.render("service/list", { name: moduleName }),
      destroy: engine.render("service/destroy", { name: moduleName }),
    },
    repository: {
      index: engine.render("repository/index", { name: moduleName }),
      create: engine.render("repository/create", { name: moduleName }),
      update: engine.render("repository/update", { name: moduleName }),
      show: engine.render("repository/show", { name: moduleName }),
      list: engine.render("repository/list", { name: moduleName }),
      destroy: engine.render("repository/destroy", { name: moduleName }),
    },
    validation: {
      index: engine.render("validation/index", { name: moduleName }),
      create: engine.render("validation/create", { name: moduleName }),
      update: engine.render("validation/update", { name: moduleName }),
    },
    route: {
      api: engine.render("routes/api", { name: moduleName }),
      fullstack: engine.render("routes/fullstack", { name: moduleName }),
    },
    index: engine.render("module-index", { name: moduleName }),
  };

  const outputs = {
    index: path.join(moduleBasePath, moduleDir, "index.ts"),
    controllers: {
      index: path.join(moduleBasePath, moduleDir, "controllers/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "controllers/create.ts"),
      store: path.join(moduleBasePath, moduleDir, "controllers/store.ts"),
      edit: path.join(moduleBasePath, moduleDir, "controllers/edit.ts"),
      update: path.join(moduleBasePath, moduleDir, "controllers/update.ts"),
      show: path.join(moduleBasePath, moduleDir, "controllers/show.ts"),
      list: path.join(moduleBasePath, moduleDir, "controllers/list.ts"),
      destroy: path.join(moduleBasePath, moduleDir, "controllers/destroy.ts"),
    },
    services: {
      index: path.join(moduleBasePath, moduleDir, "services/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "services/create.ts"),
      update: path.join(moduleBasePath, moduleDir, "services/update.ts"),
      show: path.join(moduleBasePath, moduleDir, "services/show.ts"),
      list: path.join(moduleBasePath, moduleDir, "services/list.ts"),
      destroy: path.join(moduleBasePath, moduleDir, "services/destroy.ts"),
    },
    repositories: {
      index: path.join(moduleBasePath, moduleDir, "repositories/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "repositories/create.ts"),
      update: path.join(moduleBasePath, moduleDir, "repositories/update.ts"),
      show: path.join(moduleBasePath, moduleDir, "repositories/show.ts"),
      list: path.join(moduleBasePath, moduleDir, "repositories/list.ts"),
      destroy: path.join(moduleBasePath, moduleDir, "repositories/destroy.ts"),
    },
    validations: {
      index: path.join(moduleBasePath, moduleDir, "validations/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "validations/create.ts"),
      update: path.join(moduleBasePath, moduleDir, "validations/update.ts"),
    },
    route: path.join(
      moduleBasePath,
      moduleDir,
      `${Utils.string.singularize(Utils.string.kebabCase(moduleName))}.routes.ts`,
    ),
    tests: path.join(moduleBasePath, moduleDir, "tests", ".gitkeep"),
    pages: {
      list: path.join(moduleBasePath, moduleDir, "pages/list", "page.html"),
      create: path.join(moduleBasePath, moduleDir, "pages/create", "page.html"),
      edit: path.join(moduleBasePath, moduleDir, "pages/edit", "page.html"),
      show: path.join(moduleBasePath, moduleDir, "pages/show", "page.html"),
    },
  };

  // Create directories
  fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "controllers"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "services"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "repositories"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "validations"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "tests"), { recursive: true });

  // Create files
  if (mode === "api") {
    fs.writeFileSync(outputs.controllers.index, await templates.controller.api.index);
    fs.writeFileSync(outputs.controllers.store, await templates.controller.api.store);
    fs.writeFileSync(outputs.controllers.update, await templates.controller.api.update);
    fs.writeFileSync(outputs.controllers.show, await templates.controller.api.show);
    fs.writeFileSync(outputs.controllers.list, await templates.controller.api.list);
    fs.writeFileSync(outputs.controllers.destroy, await templates.controller.api.destroy);

    fs.writeFileSync(outputs.route, await templates.route.api);
  } else {
    fs.writeFileSync(outputs.controllers.index, await templates.controller.fullstack.index);
    fs.writeFileSync(outputs.controllers.create, await templates.controller.fullstack.create);
    fs.writeFileSync(outputs.controllers.store, await templates.controller.fullstack.store);
    fs.writeFileSync(outputs.controllers.edit, await templates.controller.fullstack.edit);
    fs.writeFileSync(outputs.controllers.update, await templates.controller.fullstack.update);
    fs.writeFileSync(outputs.controllers.show, await templates.controller.fullstack.show);
    fs.writeFileSync(outputs.controllers.list, await templates.controller.fullstack.list);
    fs.writeFileSync(outputs.controllers.destroy, await templates.controller.fullstack.destroy);

    fs.writeFileSync(outputs.route, await templates.route.fullstack);

    fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "pages"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "pages/list"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "pages/create"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "pages/edit"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), moduleBasePath, moduleDir, "pages/show"), { recursive: true });

    const templatesPath = path.join(process.cwd(), "app/commands/modules/templates/pages");
    const pagesBasePath = path.join(process.cwd(), moduleBasePath, moduleDir, "pages");

    fs.copyFileSync(path.join(templatesPath, "list.txt"), path.join(pagesBasePath, "list/page.html"));
    fs.copyFileSync(path.join(templatesPath, "create.txt"), path.join(pagesBasePath, "create/page.html"));
    fs.copyFileSync(path.join(templatesPath, "edit.txt"), path.join(pagesBasePath, "edit/page.html"));
    fs.copyFileSync(path.join(templatesPath, "show.txt"), path.join(pagesBasePath, "show/page.html"));
  }

  fs.writeFileSync(outputs.services.index, await templates.service.index);
  fs.writeFileSync(outputs.services.create, await templates.service.create);
  fs.writeFileSync(outputs.services.update, await templates.service.update);
  fs.writeFileSync(outputs.services.show, await templates.service.show);
  fs.writeFileSync(outputs.services.list, await templates.service.list);
  fs.writeFileSync(outputs.services.destroy, await templates.service.destroy);

  fs.writeFileSync(outputs.repositories.index, await templates.repository.index);
  fs.writeFileSync(outputs.repositories.create, await templates.repository.create);
  fs.writeFileSync(outputs.repositories.update, await templates.repository.update);
  fs.writeFileSync(outputs.repositories.show, await templates.repository.show);
  fs.writeFileSync(outputs.repositories.list, await templates.repository.list);
  fs.writeFileSync(outputs.repositories.destroy, await templates.repository.destroy);

  fs.writeFileSync(outputs.validations.index, await templates.validation.index);
  fs.writeFileSync(outputs.validations.create, await templates.validation.create);
  fs.writeFileSync(outputs.validations.update, await templates.validation.update);

  fs.writeFileSync(outputs.tests, "");
  fs.writeFileSync(outputs.index, await templates.index);

  // Generated message
  const colored = colorize("#FFA500", `modules/${Utils.string.kebabCase(name)}`);
  const message = `The module has been generated at ${colored}.`;

  return console.log(message);
};
