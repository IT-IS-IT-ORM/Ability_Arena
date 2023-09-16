import type { I_Room, I_WS_ChatMessage } from "@/def_types/game";

import { atom, selector } from "recoil";
import { A_User } from "@/store/user-atom";

export interface gameStateProperties {
  currentRoom: I_Room | null;
  roomList: I_Room[];
  // 聊天室内容
  messageList: I_WS_ChatMessage[];
}

export const defaultGameState: gameStateProperties = {
  currentRoom: null,
  roomList: [],
  messageList: [],
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
