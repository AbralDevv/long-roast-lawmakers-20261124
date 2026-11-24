import { mkdirSync, writeFileSync } from "node:fs";

// One satirical sentence (max 320 chars) roasting lawmakers who regulate
// AI / crypto / the internet but cannot convert a file to PDF.
// Turn: the committee forces AI to explain itself, then cannot export its
// own minutes as a PDF — authority set up, undercut by the file.
const ENTRY =
  "The committee that regulates the internet just voted to force every AI system to explain itself, then spent forty minutes in the hearing room because no one could work out how to export the minutes as a PDF.";

mkdirSync("/output", { recursive: true });

// Gate self-check: the sealed scorer only accepts UTF-8 text of 1-320
// characters, not only whitespace. Fail loudly here rather than emit an
// entry the gate would refuse.
if (ENTRY.length < 1 || ENTRY.length > 320) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-320`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.trimEnd().endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

writeFileSync("/output/entry.txt", ENTRY, "utf8");
