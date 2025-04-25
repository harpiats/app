import { handlers } from "./handlers";
import { getOption } from "./options";
import { engine } from "./setup";

export const Generator = async () => {
  const cliOption = process.argv[2];
  const option = await getOption(cliOption);

  const generators = {
    factory: handlers.factory,
    module: handlers.module,
    task: handlers.task,
    test: handlers.test,
    validation: handlers.validation,
    observer: handlers.observer,
  };

  if (!option) {
    return console.warn("You need to select an option to generate.");
  }

  if (!Object.keys(generators).includes(option)) {
    return console.error("Invalid option.");
  }

  await generators[option as keyof typeof generators](engine);
};

await Generator();
