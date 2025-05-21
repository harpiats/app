import path from "node:path";
import { updateExportFile } from "./updateExportFile";

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");

updateExportFile(schemaPath);
