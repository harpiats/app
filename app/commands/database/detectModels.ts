import fs from "node:fs";

export function detectModels(schemaPath: string): string[] {
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");
  const modelRegex = /model\s+(\w+)\s+/g; // Regular expression to find models
  const models: string[] = [];
  let match: RegExpExecArray | null = null;

  // Find all models in the schema
  while (true) {
    match = modelRegex.exec(schemaContent);
    if (match === null) break;
    models.push(match[1]); // Add the model name to the array
  }

  return models;
}
