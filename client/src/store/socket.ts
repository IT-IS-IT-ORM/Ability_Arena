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

      let protocol = window.location.protocol;
      let host = window.location.host;

      protocol = protocol.replace("http", "ws");
      protocol = protocol.replace("https", "wss");
      host = host.replace("localhost", "127.0.0.1");
      host = host.replace("2333", "3332");

      this.socket = io(`${protocol}//${host}`, {
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
