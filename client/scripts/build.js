import Path from "path";
import Chalk from "chalk";
import FileSystem from "fs";
import { build } from "vite";
import compileTs from "./tsc.js";

function buildRenderer() {
  return build({
    configFile: Path.join(import.meta.dirname, "..", "vite.config.js"),
    base: "./",
    mode: "production",
  });
}

function buildMain() {
  const mainPath = Path.join(import.meta.dirname, "..", "src", "main");
  return compileTs(mainPath);
}

FileSystem.rmSync(Path.join(import.meta.dirname, "..", "build"), {
  recursive: true,
  force: true,
});

console.log(Chalk.blueBright("Transpiling renderer & main..."));

Promise.allSettled([buildRenderer(), buildMain()]).then(() => {
  console.log(
    Chalk.greenBright(
      "Renderer & main successfully transpiled! (ready to be built with electron-builder)"
    )
  );
});
