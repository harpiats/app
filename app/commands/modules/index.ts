import { handlers } from "./handlers";
import { option } from "./options";
import { engine } from "./setup";

export const Generator = async () => {
  const generators = {
    factory: handlers.factory,
    module: handlers.module,
    task: handlers.task,
    test: handlers.test,
    validation: handlers.validation,
    observer: handlers.observer,
  };

  if (!Object.keys(generators).includes(option)) {
    return console.error("Generator not found.");
  }

  if (!option) {
    return console.warn("You need to select an option to generate.");
  }

  await generators[option as keyof typeof generators](engine);
};

await Generator();
