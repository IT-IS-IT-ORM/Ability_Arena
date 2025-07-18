import Lifeform from "#src/core/Lifeform.js";
import Attribute from "#src/core/Attribute.js";

const Axe = new Lifeform({
  baseAttack: 45,
  strength: 32,
  agility: 24,
  intelligence: 16,
  attribut: Attribute.strength,
});

console.log("Axe: ", Axe);
