import fs from "node:fs";
import path from "node:path";
import { detectModels } from "./detectModels";
import { generateExports } from "./generateExports";

export function updateExportFile(schemaPath: string) {
  const models = detectModels(schemaPath);
  const exportsCode = generateExports(models);

  const exportFilePath = path.join(process.cwd(), "app/database", "index.ts");

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(exportFilePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file ${exportFilePath}:`, error);
    return;
  }

  const regex = /export\s+const\s+{[\s\S]*?}\s*=\s*prisma\s*;/s;
  const newExportsBlock = exportsCode.trim();

  const newFileContent = fileContent.replace(regex, newExportsBlock);

  fs.writeFileSync(exportFilePath, newFileContent, "utf-8");
  console.log("Export file updated successfully!");
}
