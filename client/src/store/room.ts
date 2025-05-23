// Type-Def
import type { I_Room, I_RoomStatistics, I_RoomAction } from "@/type-def/Room";

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
    isListeningRoomActions: false,
    roomActions: [] as I_RoomAction[],
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

    // 发送房间通知
    sendRoomNotification(roomId: string, content: string) {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit(
          "room:notification",
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

    // 获取房间消息
    fetchRoomMessages() {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject("common_socket_not_connected");
          return;
        }

        if (this.isListeningRoomActions) {
          return;
        }

        this.isListeningRoomActions = true;

        const onActionHanlder = (actionType: string, data: any) => {
          console.log("Action", actionType, data);

          this.roomActions.push({
            type: actionType,
            data,
            timestamp: data.timestamp,
          });
        };

        socketStore.socket.on("room:memberJoined", (data: any) =>
          onActionHanlder("playerJoined", data)
        );
        socketStore.socket.on("room:memberLeft", (data: any) =>
          onActionHanlder("playerLeft", data)
        );
        socketStore.socket.on("room:newMessage", (data: any) =>
          onActionHanlder("message", data)
        );
        resolve();
      });
    },

    // 清除房间消息
    cancelFetchRoomMessages() {
      const socketStore = useSocketStore();
      if (!socketStore.socket) {
        return;
      }

      socketStore.socket.off("room:memberJoined");
      socketStore.socket.off("room:memberLeft");
      socketStore.socket.off("room:newMessage");

      this.roomActions = [];
      this.isListeningRoomActions = false;
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
