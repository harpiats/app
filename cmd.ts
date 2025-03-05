import { execSync } from "node:child_process";
import path from "node:path";
import Bun from "bun";

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
    start: async () => {
      execCommand("clear && bun build ./resources/assets/js/scripts.js --outfile ./public/js/bundle.js");
      execCommand("clear && bun start/server.ts");
    },
    dev: async () => {
      type Mode = "api" | "fullstack";

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
    tests: async () => {
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
    generate: () => execCommand("clear && bun app/commands/modules/index.ts"),
    studio: () => execCommand("prisma studio"),
    seed: () => execCommand("prisma db seed"),
  };

  if (commands[script]) {
    commands[script](args);
  } else {
    console.log(`Script "${script}" not found`);
  }
};

const [, , script, ...args] = process.argv;

run(script, args);
