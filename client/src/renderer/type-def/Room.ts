import type { I_BasePlayer } from "@/type-def/Player";

export enum ENUM_ROOM_STATUS {
  WAITING = "waiting",
  PLAYING = "playing",
}

export interface I_Room {
  _id: string;
  name: string;
  creator: string;
  createdAt: string;
  status: ENUM_ROOM_STATUS;
  members: I_BasePlayer[];
}

export interface I_RoomStatistics {
  onlinePlayers: number;
  roomsCount: number;
}

export interface I_RoomAction {
  type: string;
  data: any;
  timestamp: string;
}

export interface I_RoomStoreState {
  room: I_Room | null;
  rooms: I_Room[];
  roomStatistics: I_RoomStatistics;
  roomActions: I_RoomAction[];
}
