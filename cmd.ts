import { execSync } from "node:child_process";
import path from "node:path";
import Bun from "bun";

type Mode = "api" | "fullstack";

const npmBinPath = path.join(process.cwd(), "node_modules", ".bin");

const execCommand = (command: string): void => {
  try {
    execSync(command, {
      stdio: "inherit",
      env: { ...process.env, PATH: `${npmBinPath}:${process.env.PATH}` },
    });
  } catch (error) {
    console.log("\n");
    console.log("Process Interrupted");

    process.exit(0);
  }
};

const checkDependency = async (str: string): Promise<boolean> => {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = Bun.file(packageJsonPath);

  if (!packageJson.size) {
    console.log("package.json not found");
    process.exit(0);
  }

  const packageJsonContent = await packageJson.json();

  return packageJsonContent.dependencies[str];
};

export const run = (script: string, args: string[]): void => {
  const commands: any = {
    // Start application
    start: () => {
      const appMode: Mode = (process.env.MODE as Mode) || "api";

      if (appMode === "fullstack") {
        execCommand("clear && bun build ./resources/assets/js/scripts.js --outfile ./public/js/bundle.js");
        execCommand("clear && bun start/server.ts");
      } else {
        execCommand("clear && bun start/server.ts");
      }
    },
    dev: async () => {
      const tailwindExists = await checkDependency("tailwindcss");
      const appMode: Mode = (process.env.MODE as Mode) || "api";

      if (appMode === "fullstack") {
        if (tailwindExists) {
          await Promise.all([
            Bun.$`bun --hot start/server.ts`,
            Bun.$`bun tailwindcss -i ./resources/assets/css/tailwind.css -o ./public/css/styles.css --watch`,
            Bun.$`bun build --watch ./resources/assets/js/scripts.js --outfile ./public/js/bundle.js`,
          ]);
        } else {
          await Promise.all([
            Bun.$`bun --hot start/server.ts`,
            Bun.$`bun build --watch ./resources/assets/js/scripts.js --outfile ./public/js/bundle.js`,
          ]);
        }
      } else {
        execCommand("clear && bun --hot start/server.ts");
      }
    },

    // Utilities
    tests: () => {
      if (args.length === 0) {
        execCommand("bun test modules");
      } else {
        const paths = args[0].split("/");
        const moduleDir = paths.shift();
        const testFile = paths.pop();
        const directories = paths.join("/");

        if (!moduleDir) {
          throw new Error("Module directory not found. Example: modules/hello/store");
        }

        if (!testFile) {
          execCommand(`bun test modules/${moduleDir}/tests/`);
        } else {
          execCommand(`bun test modules/${moduleDir}/tests${directories}/${testFile}.spec.ts`);
        }
      }
    },
    generate: () => {
      const generateArgs = args.join(" ");

      if (generateArgs.includes("--config")) {
        const configName = generateArgs.split("--config")[1].trim();

        execCommand(`clear && bun app/commands/config/index.ts ${configName}`);
      } else {
        execCommand(`clear && bun app/commands/modules/index.ts ${generateArgs}`);
      }
    },
    studio: () => execCommand("prisma studio"),
    seed: () => {
      const seedName = args[0];
      if (seedName) {
        execCommand(`clear && bun app/database/seeds/index.ts ${seedName}`);
      } else {
        execCommand("clear && bun app/database/seeds/index.ts");
      }
    },
    migrate: () => {
      execCommand("prisma generate");
      execCommand("prisma migrate dev");
      execCommand("bun app/commands/database/index.ts");
    },
    deploy: () => {
      execCommand("prisma generate");
      execCommand("prisma migrate deploy");
    },
  };

  if (commands[script]) {
    commands[script](args);
  } else {
    console.log(`Script "${script}" not found`);
  }
};

const [, , script, ...args] = process.argv;

run(script, args);
