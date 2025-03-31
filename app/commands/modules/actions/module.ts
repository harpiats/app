import fs from "node:fs";
import path from "node:path";

import { Utils, colorize } from "app/utils";
import type { Props } from "./types/props";

type Mode = "api" | "fullstack";

export const module = async ({ engine, name }: Props) => {
  const modulePath = path.join("modules");
  const mode: Mode = (process.env.MODE as Mode) || "api";

  const templates = {
    controller: {
      api: {
        index: engine.render("controller/api/index", { name }),
        store: engine.render("controller/api/Store", { name }),
        update: engine.render("controller/api/Update", { name }),
        show: engine.render("controller/api/Show", { name }),
        list: engine.render("controller/api/List", { name }),
        delete: engine.render("controller/api/Delete", { name }),
      },
      fullstack: {
        index: engine.render("controller/fullstack/index", { name }),
        create: engine.render("controller/fullstack/Create", { name }),
        store: engine.render("controller/fullstack/Store", { name }),
        edit: engine.render("controller/fullstack/Edit", { name }),
        update: engine.render("controller/fullstack/Update", { name }),
        show: engine.render("controller/fullstack/Show", { name }),
        list: engine.render("controller/fullstack/List", { name }),
        delete: engine.render("controller/fullstack/Delete", { name }),
      },
    },
    service: {
      index: engine.render("service/index", { name }),
      create: engine.render("service/Create", { name }),
      update: engine.render("service/Update", { name }),
      show: engine.render("service/Show", { name }),
      list: engine.render("service/List", { name }),
      delete: engine.render("service/Delete", { name }),
    },
    repository: {
      index: engine.render("repository/index", { name }),
      create: engine.render("repository/Create", { name }),
      update: engine.render("repository/Update", { name }),
      show: engine.render("repository/Show", { name }),
      list: engine.render("repository/List", { name }),
      delete: engine.render("repository/Delete", { name }),
    },
    validation: {
      index: engine.render("validation/index", { name }),
      create: engine.render("validation/create", { name }),
      update: engine.render("validation/update", { name }),
    },
    route: {
      api: engine.render("routes/api", { name }),
      fullstack: engine.render("routes/fullstack", { name }),
    },
  };

  const outputs = {
    controllers: {
      index: path.join(modulePath, name, "controllers/index.ts"),
      create: path.join(modulePath, name, "controllers/Create.ts"),
      store: path.join(modulePath, name, "controllers/Store.ts"),
      edit: path.join(modulePath, name, "controllers/Edit.ts"),
      update: path.join(modulePath, name, "controllers/Update.ts"),
      show: path.join(modulePath, name, "controllers/Show.ts"),
      list: path.join(modulePath, name, "controllers/List.ts"),
      delete: path.join(modulePath, name, "controllers/Delete.ts"),
    },
    services: {
      index: path.join(modulePath, name, "services/index.ts"),
      create: path.join(modulePath, name, "services/Create.ts"),
      update: path.join(modulePath, name, "services/Update.ts"),
      show: path.join(modulePath, name, "services/Show.ts"),
      list: path.join(modulePath, name, "services/List.ts"),
      delete: path.join(modulePath, name, "services/Delete.ts"),
    },
    repositories: {
      index: path.join(modulePath, name, "repositories/index.ts"),
      create: path.join(modulePath, name, "repositories/Create.ts"),
      update: path.join(modulePath, name, "repositories/Update.ts"),
      show: path.join(modulePath, name, "repositories/Show.ts"),
      list: path.join(modulePath, name, "repositories/List.ts"),
      delete: path.join(modulePath, name, "repositories/Delete.ts"),
    },
    validations: {
      index: path.join(modulePath, name, "validations/index.ts"),
      create: path.join(modulePath, name, "validations/Create.ts"),
      update: path.join(modulePath, name, "validations/Update.ts"),
    },
    route: path.join(modulePath, name, `${Utils.string.singularize(name)}.routes.ts`),
    tests: path.join(modulePath, name, "tests", ".gitkeep"),
    pages: {
      list: path.join(modulePath, name, "pages/list", "page.html"),
      create: path.join(modulePath, name, "pages/create", "page.html"),
      edit: path.join(modulePath, name, "pages/edit", "page.html"),
      show: path.join(modulePath, name, "pages/show", "page.html"),
    },
  };

  // Create directories
  fs.mkdirSync(path.join(process.cwd(), modulePath, name), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), modulePath, name, "controllers"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), modulePath, name, "services"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), modulePath, name, "repositories"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), modulePath, name, "validations"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), modulePath, name, "tests"), { recursive: true });

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

    fs.mkdirSync(path.join(process.cwd(), modulePath, name, "pages"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), modulePath, name, "pages/list"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), modulePath, name, "pages/create"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), modulePath, name, "pages/edit"), { recursive: true });
    fs.mkdirSync(path.join(process.cwd(), modulePath, name, "pages/show"), { recursive: true });

    const templatesPath = path.join(process.cwd(), "app/commands/modules/templates/pages");
    const pagesBasePath = path.join(process.cwd(), modulePath, name, "pages");

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
