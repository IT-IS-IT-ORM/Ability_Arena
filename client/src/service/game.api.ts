// Types
import type { I_Room } from "@/def_types/game";

import fetch from "@/service/fetch";

export interface API_GetRoomsParams {
  search?: string;
}

export const API_GetRooms = (params?: API_GetRoomsParams) =>
  fetch.get<I_Room[]>("/room/", params);
