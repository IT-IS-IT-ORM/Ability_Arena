import { Lucci, Vergo, Kaido } from "#core/data/lifeform/index.js";

globalThis.Lucci = Lucci;
globalThis.Vergo = Vergo;
globalThis.Kaido = Kaido;

console.log("Lucci: ", globalThis.Lucci);
console.log("Vergo: ", globalThis.Vergo);
console.log("Kaido: ", globalThis.Kaido);

function keepAlive(ms) {
  setTimeout(keepAlive, ms);
  console.log("程序正在保活...");
}

keepAlive(1000 * 60 * 60 * 24);
