import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function getTemplate(fileName) {
  return await fs.readFile(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "resources",
      "mail",
      "templates",
      fileName
    ),
    {
      encoding: "utf-8",
    }
  );
}
