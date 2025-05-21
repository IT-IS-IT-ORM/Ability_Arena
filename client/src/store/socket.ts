// Type-Def
import type { Socket } from "socket.io-client";
// Pinia
import { defineStore } from "pinia";
// Store
import { usePlayerStore } from "@/store/player";
// Socket
import io from "socket.io-client";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null as Socket | null,
  }),

  getters: {
    isConnected: (state) => state.socket !== null,
  },

  actions: {
    connect() {
      const playerStore = usePlayerStore();

      if (!playerStore.me._id) return;

      this.socket = io("ws://localhost:3332", {
        auth: {
          playerId: playerStore.me._id,
        },
      });
    },
    disconnect() {
      this.socket?.disconnect();
    },
  },
});
