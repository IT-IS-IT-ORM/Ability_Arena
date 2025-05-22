// Type-Def
import type { I_Room, I_RoomStatistics } from "@/type-def/Room";

// Pinia
import { defineStore } from "pinia";
// Store
import { useSocketStore } from "@/store/socket";

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: [] as I_Room[],
    room: null as I_Room | null,
    roomStatistics: {
      onlinePlayers: 0,
      roomsCount: 0,
    } as I_RoomStatistics,
  }),

  actions: {
    // 获取房间列表
    fetchRooms() {
      return new Promise<I_Room[]>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit("room:list", (response: any) => {
          if (response.success) {
            this.rooms = response.rooms;
            resolve(response.rooms);
          } else {
            reject(response.error);
          }
        });

        // 获取房间统计信息
        this.fetchRoomStatistics();
      });
    },

    // 获取房间详情
    getRoomById(roomId: string) {
      return new Promise<I_Room>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit("room:info", roomId, (response: any) => {
          if (response.success) {
            this.room = response.room;
            resolve(response.room);
          } else {
            reject(response.error);
          }
        });
      });
    },

    // 创建房间
    createRoom(name: string) {
      return new Promise<I_Room>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit("room:create", { name }, (response: any) => {
          if (response.success) {
            resolve(response.room);
          } else {
            reject(response.error);
          }
        });
      });
    },

    // 加入房间
    joinRoom(roomId: string) {
      return new Promise<I_Room>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit("room:join", roomId, (response: any) => {
          if (response.success) {
            this.room = response.room;
            resolve(response.room);
          } else {
            reject(response.error);
          }
        });
      });
    },

    // 离开房间
    leaveRoom(roomId: string) {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit("room:leave", roomId, () => {
          resolve();
        });
      });
    },

    // 发送房间消息
    sendRoomMessage(roomId: string, content: string) {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit(
          "room:message",
          { roomId, content },
          (response: any) => {
            if (response.success) {
              resolve();
            } else {
              reject(response.error);
            }
          }
        );
      });
    },

    // 获取房间统计信息
    fetchRoomStatistics() {
      return new Promise<I_RoomStatistics>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit("room:statistics", (response: any) => {
          if (response.success) {
            this.roomStatistics = response.statistics;
            resolve(response.statistics);
          } else {
            reject(response.error);
          }
        });
      });
    },
  },
});
