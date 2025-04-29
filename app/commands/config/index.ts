import { handlers } from "./handlers";
import { getOption } from "./options";
import { engine } from "./setup";

export const Generator = async () => {
  const cliOption = process.argv[2];
  const option = await getOption(cliOption);

  const generators = {
    session: handlers.session,
  };

  if (!option) {
    return console.warn("You need to select a valid option.");
  }

  if (!Object.keys(generators).includes(option)) {
    return console.error("Invalid option.");
  }

  await generators[option as keyof typeof generators](engine);
};

await Generator();
