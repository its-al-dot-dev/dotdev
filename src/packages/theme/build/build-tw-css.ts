import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTheme, parseArgs } from "./utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = parseArgs(process.argv);
const input = args.input ?? path.resolve(__dirname, "../../configs/default.ts");
const output = args.output ?? path.resolve(__dirname, "../../themes");
const name = args.name ?? "index";
const theme = await loadTheme(input);

await mkdir(output, { recursive: true });
await writeFile(path.join(output, `${name}.css`), theme.render());
console.log(
  `tw-css build -> ${path.relative(process.cwd(), path.join(output, `${name}.css`))}`,
);
