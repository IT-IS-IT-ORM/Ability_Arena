import type { I_BasePlayer } from "@/type-def/Player";

export interface I_Room {
  id: string;
  name: string;
  creator: string;
  createdAt: string;
  status: string;
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
