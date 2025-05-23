import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PRISMA_TO_TS_TYPE: Record<string, string> = {
  String: "string",
  Int: "number",
  BigInt: "number",
  Float: "number",
  Decimal: "number",
  Boolean: "boolean",
  DateTime: "Date",
  Json: "any",
};

export function getIdTypeFromSchema(modelName: string): string {
  const schemaPath = resolve(process.cwd(), "prisma", "schema.prisma");
  const schema = readFileSync(resolve(schemaPath), "utf-8");

  const modelRegex = new RegExp(`model\\s+${modelName}\\s+{([\\s\\S]*?)}`, "m");
  const modelMatch = schema.match(modelRegex);

  if (!modelMatch) {
    throw new Error(`Model "${modelName}" not found in schema.`);
  }

  const modelBody = modelMatch[1];
  const lines = modelBody.split("\n").map((line) => line.trim());

  for (const line of lines) {
    if (line.includes("@id")) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        const prismaType = parts[1];
        return PRISMA_TO_TS_TYPE[prismaType] ?? prismaType.toLowerCase();
      }
    }
  }

  throw new Error(`No @id field found in model "${modelName}".`);
}
