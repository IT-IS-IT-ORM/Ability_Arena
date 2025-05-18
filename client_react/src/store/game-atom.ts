import type { I_Room, I_WS_ChatMessage } from "@/def_types/game";

import { atom } from "recoil";

export interface gameStateProperties {
  room: I_Room | null;
  // 聊天室内容
  messageList: I_WS_ChatMessage[];
}

export const defaultGameState: gameStateProperties = {
  room: null,
  messageList: [],
};

export const A_Game = atom({
  key: "A_Game",
  // default value, aka initial value
  default: defaultGameState,
});
