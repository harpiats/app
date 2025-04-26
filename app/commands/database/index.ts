import path from "node:path";
import { updateExportFile } from "./updateExportFile";

const schemaPath = path.join(process.cwd(), "app/database", "schema.prisma");

updateExportFile(schemaPath);
