// Type-Def
import type { I_Room, I_RoomStoreState } from "@/type-def/Room";

// Pinia
import { defineStore } from "pinia";
// Store
import { useSocketStore } from "@/store/socket";
import { usePlayerStore } from "@/store/player";
// Constants
import socketEvent from "@/constants/socketEvent";

export const useRoomStore = defineStore("room", {
  state: (): I_RoomStoreState => ({
    rooms: [],
    room: null,

    roomStatistics: {
      onlinePlayers: 0,
      roomsCount: 0,
    },

    roomActions: [],
  }),

  actions: {
    fetchRooms() {
      const socketStore = useSocketStore();
      if (!socketStore.socket) {
        return;
      }

      // 防止重复监听
      this.stopFetchRooms();
      // 立即得到一次房间列表
      socketStore.socket.emit(socketEvent.room.list, (response: any) => {
        if (response.success) {
          this.rooms = response.rooms;
        }
      });
      // 监听房间列表更新
      socketStore.socket.on(
        socketEvent.room.list,
        (rooms: I_Room[]) => (this.rooms = rooms)
      );
    },

    stopFetchRooms(clearRooms = false) {
      const socketStore = useSocketStore();
      if (!socketStore.socket) {
        return;
      }

      if (clearRooms) {
        this.rooms = [];
      }

      socketStore.socket.off(socketEvent.room.list);
    },

    getRoomById(roomId: string) {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        // 如果房间已存在，则直接返回
        if (!this.room || this.room._id !== roomId) {
          // 立即得到一次房间详情
          socketStore.socket.emit(
            socketEvent.room.detail,
            roomId,
            (response: any) => {
              if (response.success) {
                this.room = response.room;
                resolve();
              } else {
                reject(response.error);
              }
            }
          );
        }
        // 防止重复监听
        socketStore.socket.off(socketEvent.room.detail);
        // 监听房间详情更新
        socketStore.socket.on(
          socketEvent.room.detail,
          (room: I_Room) => (this.room = room)
        );
      });
    },

    createRoom(name: string) {
      return new Promise<I_Room>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit(
          socketEvent.room.create,
          { name },
          (response: any) => {
            if (response.success) {
              this.room = response.room;
              const playerStore = usePlayerStore();
              playerStore.me.inRoom = true;
              resolve(response.room);
            } else {
              reject(response.error);
            }
          }
        );
      });
    },

    joinRoom(roomId: string) {
      return new Promise<I_Room>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        socketStore.socket.emit(
          socketEvent.room.join,
          roomId,
          (response: any) => {
            if (response.success) {
              const playerStore = usePlayerStore();
              playerStore.me.inRoom = true;
              this.room = response.room;
              this.listenRoomActions();
              resolve(response.room);
            } else {
              reject(response.error);
            }
          }
        );
      });
    },

    leaveRoom() {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        if (!this.room) {
          reject();
          return;
        }

        const roomId = this.room._id;

        socketStore.socket.emit(socketEvent.room.leave, roomId, () => {
          const playerStore = usePlayerStore();
          playerStore.me.inRoom = false;
          this.room = null;
          this.stopListenRoomActions();
          socketStore.socket!.off(socketEvent.room.detail);
          resolve();
        });
      });
    },

    sendMessageToRoom(content: string) {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        if (!this.room) {
          reject();
          return;
        }

        const roomId = this.room._id;

        socketStore.socket.emit(
          socketEvent.room.message,
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

    sendNotificationToRoom(content: string) {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        if (!this.room) {
          reject();
          return;
        }

        const roomId = this.room._id;
        socketStore.socket.emit(
          socketEvent.room.notification,
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

    listenRoomActions() {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        const onActionHanlder = (actionType: string, data: any) => {
          console.log("收到 Action: ", actionType, data);

          this.roomActions.push({
            type: actionType,
            data,
            timestamp: data.timestamp,
          });
        };

        // 防止重复监听
        this.stopListenRoomActions();

        socketStore.socket.on(socketEvent.room.join, (data: any) =>
          onActionHanlder(socketEvent.room.join, data)
        );
        socketStore.socket.on(socketEvent.room.leave, (data: any) =>
          onActionHanlder(socketEvent.room.leave, data)
        );
        socketStore.socket.on(socketEvent.room.message, (data: any) =>
          onActionHanlder(socketEvent.room.message, data)
        );

        resolve();
      });
    },

    stopListenRoomActions(clearActions = false) {
      const socketStore = useSocketStore();
      if (!socketStore.socket) {
        return;
      }

      socketStore.socket.off(socketEvent.room.join);
      socketStore.socket.off(socketEvent.room.leave);
      socketStore.socket.off(socketEvent.room.message);

      if (clearActions) {
        this.roomActions = [];
      }
    },

    fetchRoomStatistics() {
      return new Promise<void>((resolve, reject) => {
        const socketStore = useSocketStore();
        if (!socketStore.socket) {
          reject();
          return;
        }

        // 防止重复监听
        this.stopFetchRoomStatistics();

        socketStore.socket.emit(
          socketEvent.room.statistics,
          (response: any) => {
            if (response.success) {
              this.roomStatistics = response.statistics;
              resolve();
            } else {
              reject(response.error);
            }
          }
        );
      });
    },

    stopFetchRoomStatistics() {
      const socketStore = useSocketStore();
      if (!socketStore.socket) {
        return;
      }

      socketStore.socket.off(socketEvent.room.statistics);
    },
  },
});
