import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const story =
  "I taught my daughter to knock twice on the wall if she had a bad dream, so I would know it was her. Last night something knocked three times, then twice more—slower, as if it had been listening.";

// Mirror the gate and task: UTF-8 text, 1-400 characters, not only white space, exactly two sentences.
function assertValidStory(text) {
  const chars = [...text].length;
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (chars < 1 || chars > 400 || text.trim() === "" || sentences.length !== 2) {
    throw new Error(`entry fails the gate: ${chars} chars, ${sentences.length} sentences`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidStory(story);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", story);
