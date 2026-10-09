import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetDirectories = ["src/assets", "src/public"].map((directory) =>
  path.join(projectRoot, directory),
);
const inputExtensions = new Set([".bmp", ".jpg", ".jpeg", ".png", ".tif", ".tiff"]);
const quality = 78;
const effort = 6;

async function convertDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  let converted = 0;
  let originalBytes = 0;
  let webpBytes = 0;
  let existingWebpFiles = 0;

  for (const entry of entries) {
    const inputPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const result = await convertDirectory(inputPath);
      converted += result.converted;
      originalBytes += result.originalBytes;
      webpBytes += result.webpBytes;
      existingWebpFiles += result.existingWebpFiles;
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (extension === ".webp") {
      existingWebpFiles += 1;
      continue;
    }
    if (!inputExtensions.has(extension)) continue;

    const outputPath = `${inputPath.slice(0, -path.extname(inputPath).length)}.webp`;
    const inputSize = (await stat(inputPath)).size;
    await sharp(inputPath).webp({ quality, effort }).toFile(outputPath);
    const outputSize = (await stat(outputPath)).size;

    console.log(
      `${path.relative(projectRoot, inputPath)} -> ${path.relative(projectRoot, outputPath)} ` +
        `(${inputSize} B -> ${outputSize} B)`,
    );
    converted += 1;
    originalBytes += inputSize;
    webpBytes += outputSize;
  }

  return { converted, originalBytes, webpBytes, existingWebpFiles };
}

let converted = 0;
let originalBytes = 0;
let webpBytes = 0;
let existingWebpFiles = 0;

for (const directory of assetDirectories) {
  const result = await convertDirectory(directory);
  converted += result.converted;
  originalBytes += result.originalBytes;
  webpBytes += result.webpBytes;
  existingWebpFiles += result.existingWebpFiles;
}

if (converted === 0) {
  if (existingWebpFiles > 0) {
    console.log(`No source images to convert; found ${existingWebpFiles} existing WebP images.`);
  } else {
    throw new Error("No supported source images were found in src/assets or src/public.");
  }
} else {
  const reduction = ((1 - webpBytes / originalBytes) * 100).toFixed(1);
  console.log(
    `Converted ${converted} images: ${originalBytes} B -> ${webpBytes} B (${reduction}% smaller).`,
  );
}
