import path from "node:path";
import { colorize } from "app/utils";
import { Glob } from "bun";
import { prisma } from "..";

const seedsDirectory = path.join(process.cwd(), "app/database/seeds");
const pattern = "**/*.seed.ts";

async function runAllSeeds() {
  const glob = new Glob(pattern);
  const filesIterator = glob.scan({ cwd: seedsDirectory, absolute: true });

  for await (const file of filesIterator) {
    try {
      const seedModule = await import(file);
      if (typeof seedModule.run === "function") {
        const coloredSeedName = colorize("#4E9AF1", path.basename(file));
        console.log(`Running seed: ${coloredSeedName}`);

        await seedModule.run();
        console.log(colorize("#2ECC71", `Seed completed: ${path.basename(file)}`));
      }
    } catch (error) {
      console.error(colorize("#E74C3C", `Error in seed ${file}:`), error);
    }
  }
}

async function runSpecificSeed(seedName: string) {
  const normalizedSeedName = seedName.replace(/\.seed\.ts$/, "");
  const seedPath = path.join(seedsDirectory, `${normalizedSeedName}.seed.ts`);

  try {
    const seedModule = await import(seedPath);
    if (typeof seedModule.run === "function") {
      console.log(colorize("#4E9AF1", `Running seed: ${seedName}`));
      await seedModule.run();
      console.log(colorize("#2ECC71", `Seed completed: ${seedName}`));
    } else {
      console.log(colorize("#F39C12", `Seed file ${seedName} has no 'run' function`));
    }
  } catch (error: any) {
    if (error.code === "ERR_MODULE_NOT_FOUND") {
      console.log(colorize("#E74C3C", `Seed not found: ${seedName}`));
    } else {
      console.error(colorize("#E74C3C", `Error in seed ${seedName}:`), error);
    }
  }
}

const run = async () => {
  const seedName = process.argv[2];

  if (seedName) {
    await runSpecificSeed(seedName);
  } else {
    await runAllSeeds();
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
