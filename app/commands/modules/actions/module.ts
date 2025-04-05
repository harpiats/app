import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { Props } from "./types/props";

type Mode = "api" | "fullstack";

export const module = async ({ engine, name }: Props) => {
  const moduleBasePath = path.join("modules");
  const mode: Mode = (process.env.MODE as Mode) || "api";

  const pathParts = name.split("/");
  const moduleName = pathParts.pop() || name;
  const moduleWrapper = pathParts.slice(0, -1).join("/") || name;
  const moduleDir = pathParts.slice(0, -1).join("/") ? path.join(moduleWrapper, moduleName) : moduleName;

  const templates = {
    controller: {
      api: {
        index: engine.render("controller/api/index", { name: moduleName }),
        store: engine.render("controller/api/Store", { name: moduleName }),
        update: engine.render("controller/api/Update", { name: moduleName }),
        show: engine.render("controller/api/Show", { name: moduleName }),
        list: engine.render("controller/api/List", { name: moduleName }),
        delete: engine.render("controller/api/Delete", { name: moduleName }),
      },
      fullstack: {
        index: engine.render("controller/fullstack/index", { name: moduleName }),
        create: engine.render("controller/fullstack/Create", { name: moduleName }),
        store: engine.render("controller/fullstack/Store", { name: moduleName }),
        edit: engine.render("controller/fullstack/Edit", { name: moduleName }),
        update: engine.render("controller/fullstack/Update", { name: moduleName }),
        show: engine.render("controller/fullstack/Show", { name: moduleName }),
        list: engine.render("controller/fullstack/List", { name: moduleName }),
        delete: engine.render("controller/fullstack/Delete", { name: moduleName }),
      },
    },
    service: {
      index: engine.render("service/index", { name: moduleName }),
      create: engine.render("service/Create", { name: moduleName }),
      update: engine.render("service/Update", { name: moduleName }),
      show: engine.render("service/Show", { name: moduleName }),
      list: engine.render("service/List", { name: moduleName }),
      delete: engine.render("service/Delete", { name: moduleName }),
    },
    repository: {
      index: engine.render("repository/index", { name: moduleName }),
      create: engine.render("repository/Create", { name: moduleName }),
      update: engine.render("repository/Update", { name: moduleName }),
      show: engine.render("repository/Show", { name: moduleName }),
      list: engine.render("repository/List", { name: moduleName }),
      delete: engine.render("repository/Delete", { name: moduleName }),
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
  };

  const outputs = {
    controllers: {
      index: path.join(moduleBasePath, moduleDir, "controllers/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "controllers/Create.ts"),
      store: path.join(moduleBasePath, moduleDir, "controllers/Store.ts"),
      edit: path.join(moduleBasePath, moduleDir, "controllers/Edit.ts"),
      update: path.join(moduleBasePath, moduleDir, "controllers/Update.ts"),
      show: path.join(moduleBasePath, moduleDir, "controllers/Show.ts"),
      list: path.join(moduleBasePath, moduleDir, "controllers/List.ts"),
      delete: path.join(moduleBasePath, moduleDir, "controllers/Delete.ts"),
    },
    services: {
      index: path.join(moduleBasePath, moduleDir, "services/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "services/Create.ts"),
      update: path.join(moduleBasePath, moduleDir, "services/Update.ts"),
      show: path.join(moduleBasePath, moduleDir, "services/Show.ts"),
      list: path.join(moduleBasePath, moduleDir, "services/List.ts"),
      delete: path.join(moduleBasePath, moduleDir, "services/Delete.ts"),
    },
    repositories: {
      index: path.join(moduleBasePath, moduleDir, "repositories/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "repositories/Create.ts"),
      update: path.join(moduleBasePath, moduleDir, "repositories/Update.ts"),
      show: path.join(moduleBasePath, moduleDir, "repositories/Show.ts"),
      list: path.join(moduleBasePath, moduleDir, "repositories/List.ts"),
      delete: path.join(moduleBasePath, moduleDir, "repositories/Delete.ts"),
    },
    validations: {
      index: path.join(moduleBasePath, moduleDir, "validations/index.ts"),
      create: path.join(moduleBasePath, moduleDir, "validations/Create.ts"),
      update: path.join(moduleBasePath, moduleDir, "validations/Update.ts"),
    },
    route: path.join(moduleBasePath, moduleDir, `${Utils.string.singularize(moduleName)}.routes.ts`),
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
    fs.writeFileSync(outputs.controllers.delete, await templates.controller.api.delete);

    fs.writeFileSync(outputs.route, await templates.route.api);
  } else {
    fs.writeFileSync(outputs.controllers.index, await templates.controller.fullstack.index);
    fs.writeFileSync(outputs.controllers.create, await templates.controller.fullstack.create);
    fs.writeFileSync(outputs.controllers.store, await templates.controller.fullstack.store);
    fs.writeFileSync(outputs.controllers.edit, await templates.controller.fullstack.edit);
    fs.writeFileSync(outputs.controllers.update, await templates.controller.fullstack.update);
    fs.writeFileSync(outputs.controllers.show, await templates.controller.fullstack.show);
    fs.writeFileSync(outputs.controllers.list, await templates.controller.fullstack.list);
    fs.writeFileSync(outputs.controllers.delete, await templates.controller.fullstack.delete);

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
  fs.writeFileSync(outputs.services.delete, await templates.service.delete);

  fs.writeFileSync(outputs.repositories.index, await templates.repository.index);
  fs.writeFileSync(outputs.repositories.create, await templates.repository.create);
  fs.writeFileSync(outputs.repositories.update, await templates.repository.update);
  fs.writeFileSync(outputs.repositories.show, await templates.repository.show);
  fs.writeFileSync(outputs.repositories.list, await templates.repository.list);
  fs.writeFileSync(outputs.repositories.delete, await templates.repository.delete);

  fs.writeFileSync(outputs.validations.index, await templates.validation.index);
  fs.writeFileSync(outputs.validations.create, await templates.validation.create);
  fs.writeFileSync(outputs.validations.update, await templates.validation.update);

  fs.writeFileSync(outputs.tests, "");

  // Generated message
  const colored = colorize("#FFA500", `modules/${name}`);
  const message = `The module has been generated at ${colored}.`;

  return console.log(message);
};
