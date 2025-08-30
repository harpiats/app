import fs from "node:fs";
import path from "node:path";
import { detectModels } from "./detectModels";
import { generateExports } from "./generateExports";

export function updateExportFile(schemaPath: string) {
  const models = detectModels(schemaPath);
  const exportsCode = generateExports(models);

  // Path to the export file
  const exportFilePath = path.join(process.cwd(), "app/database", "index.ts");

  // Add the first import line
  const importLine = `import { PrismaClient } from "app/database/client";\nimport { Observer } from "./observer";\n\nconst client = new PrismaClient();\nexport const observer = new Observer(client);\nexport const prisma = observer.prisma;\n\n`;

  // Write the export code to the file
  fs.writeFileSync(exportFilePath, importLine + exportsCode, "utf-8");
  console.log("Export file updated successfully!");
}
