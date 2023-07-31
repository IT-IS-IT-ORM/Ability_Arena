import { atom } from "recoil";

export interface gameStateProperties {}

export const defaultGameState: gameStateProperties = {};

export const A_Game = atom({
  key: "A_Game",
  // default value, aka initial value
  default: defaultGameState,
});
