import type { I_Room } from "@/def_types/game";

import { atom } from "recoil";

export interface gameStateProperties {
  roomList: I_Room[];
}

export const defaultGameState: gameStateProperties = {
  roomList: [
    {
      id: 1,
      name: "房间1",
    },
    {
      id: 2,
      name: "房间2",
    },
    {
      id: 3,
      name: "房间3",
    },
    {
      id: 4,
      name: "房间4",
    },
    {
      id: 5,
      name: "房间5",
    },
    {
      id: 6,
      name: "房间6",
    },
    {
      id: 7,
      name: "房间7",
    },
    {
      id: 8,
      name: "房间8",
    },
    {
      id: 9,
      name: "房间9",
    },
    {
      id: 10,
      name: "房间10",
    },
    {
      id: 11,
      name: "房间11",
    },
  ],
};

export const A_Game = atom({
  key: "A_Game",
  // default value, aka initial value
  default: defaultGameState,
});
