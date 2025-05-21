// Type-Def
import type { I_Room } from "@/type-def/Room";

// Pinia
import { defineStore } from "pinia";
// Store
import { useSocketStore } from "@/store/socket";

export const useRoomStore = defineStore("room", {
  state: () => ({
    roomStatistics: {
      roomsCount: 0,
      onlinePlayers: 0,
    },
    rooms: [] as I_Room[],
  }),

  actions: {
    async fetchRooms() {
      const socketStore = useSocketStore();

      if (!socketStore.socket) return;

      socketStore.socket.emit(
        "room:list",
        (response: { success: boolean; rooms: I_Room[] }) => {
          if (response.success) {
            this.rooms = response.rooms;
          }
        }
      );

      socketStore.socket.emit(
        "room:statistics",
        (response: {
          success: boolean;
          statistics: {
            onlinePlayers: number;
            roomsCount: number;
          };
        }) => {
          if (response.success) {
            this.roomStatistics = response.statistics;
          }
        }
      );
    },

    async createRoom(roomName: string): Promise<I_Room | undefined> {
      const socketStore = useSocketStore();

      if (!socketStore.socket) return;

      socketStore.socket.emit(
        "room:create",
        { name: roomName },
        (response: { success: boolean; room: I_Room }) => {
          if (response.success) {
            this.rooms.push(response.room);
            return response.room;
          }
        }
      );
    },
  },
});
