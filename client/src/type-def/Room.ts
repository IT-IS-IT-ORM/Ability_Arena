import type { I_BasePlayer } from "@/type-def/Player";

export interface I_Room {
  id: string;
  name: string;
  creator: string;
  createdAt: string;
  status: string;
  members: I_BasePlayer[];
}
