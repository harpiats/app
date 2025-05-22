import path from "node:path";

import { Utils } from "app/utils";
import { TemplateEngine } from "harpiats/template-engine";
import { getIdTypeFromSchema } from "../plugins/getIdType";

const templatesPath = path.join(__dirname, "templates");
const engine = new TemplateEngine({
  fileExtension: ".txt",
  path: {
    views: templatesPath,
    layouts: templatesPath,
    partials: templatesPath,
  },
});

engine.registerPlugin("pluralize", Utils.string.pluralize);
engine.registerPlugin("singularize", Utils.string.singularize);
engine.registerPlugin("pascalCase", Utils.string.pascalCase);
engine.registerPlugin("kebabCase", Utils.string.kebabCase);
engine.registerPlugin("camelCase", Utils.string.camelCase);
engine.registerPlugin("getIdTypeFromSchema", getIdTypeFromSchema);

export { engine };
