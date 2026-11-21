// Lumaris — travel poster for a place that isn't there.
// This program ships the poster image to the grader: it reads the poster
// sitting next to this file, sanity-checks it, and copies it to the
// output directory the harness points at.
//
// The poster itself is a finished image (a bioluminescent bay under
// floating isles, with "LUMARIS" set into the artwork). This program does
// not draw anything; it only delivers the image, whole and unchanged.

import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // the gate allows at most 1 MiB
const SOURCE_NAME = "entry.png";
const OUTPUT_NAME = "entry.png";

function looksLikePng(bytes: Buffer): boolean {
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  return (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  );
}

function looksLikeJpeg(bytes: Buffer): boolean {
  // JPEG files start with FF D8 FF
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = resolve(here, SOURCE_NAME);
  const image = readFileSync(sourcePath);

  const kind = looksLikePng(image) ? "PNG" : looksLikeJpeg(image) ? "JPEG" : null;
  if (kind === null) {
    throw new Error(`${SOURCE_NAME} is not a PNG or a JPEG — magic bytes do not match either format`);
  }
  if (image.length > MAX_BYTES) {
    throw new Error(`${SOURCE_NAME} is ${image.length} bytes, above the ${MAX_BYTES} byte cap`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, OUTPUT_NAME);
  writeFileSync(outPath, image);

  // Confirm the copy landed intact before reporting success.
  const written = statSync(outPath);
  if (written.size !== image.length) {
    throw new Error(`wrote ${written.size} bytes to ${outPath}, expected ${image.length}`);
  }
  console.log(`Lumaris poster delivered: ${sourcePath} -> ${outPath} (${image.length} bytes, ${kind})`);
}

main();
