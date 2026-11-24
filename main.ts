import * as fs from "node:fs";
import * as path from "node:path";

const LINE = `The senator authoring America's AI safety bill couldn't convert his Word doc to a PDF, so he called in a Big Tech lobbyist, who casually deleted all twelve pages of penalties on the way to Save As while the senator beamed over his shoulder and whispered, "Now that's innovation."`;

function pickOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"];
  for (const dir of candidates) {
    if (!dir) continue;
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return dir;
    } catch {
      // try the next candidate (second-pass revision)
    }
  }
  throw new Error("no writable output dir");
}

const outDir = pickOutDir();
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
