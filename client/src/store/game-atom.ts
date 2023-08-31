import type { I_Room } from "@/def_types/game";

import { atom, selector } from "recoil";
import { A_User } from "@/store/user-atom";

export interface gameStateProperties {
  roomList: I_Room[];
}

export const defaultGameState: gameStateProperties = {
  roomList: [],
};

export const A_Game = atom({
  key: "A_Game",
  // default value, aka initial value
  default: defaultGameState,
});

export const S_RoomDetail = selector({
  key: "S_RoomDetail",
  get({ get }) {
    const user = get(A_User);
    const game = get(A_Game);

    return game.roomList.find(
      (room) =>
        room.homeowner === user.id ||
        room.member.find((record) => record.member === user.id)
    );
  },
});
