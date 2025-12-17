import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "bun run app/database/seeds/index.ts",
  },
  datasource: {
    url: env("DB_URL"),
  },
});
