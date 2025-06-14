// Type-Def
import type { I_BasePlayer } from "@/type-def/Player";

// Pinia
import { defineStore } from "pinia";
// Store
import { useSocketStore } from "@/store/socket";
// Utils
import { localStorage } from "@/utils/localStorage";
// Assets
import {
  Avatar_1,
  Avatar_2,
  Avatar_3,
  Avatar_4,
  Avatar_5,
  Avatar_6,
  Avatar_7,
  Avatar_8,
  Avatar_9,
} from "@/assets/image/avatar";

const getDefaultPlayer: () => I_BasePlayer = () => ({
  _id: "",
  username: "",
  avatarIndex: 1,
  mmr: 0,
  team: null,
  isOnline: false,
  // Client Only
  inRoom: false,
  inGame: false,
});

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    me: localStorage.get<I_BasePlayer, I_BasePlayer>(
      "player",
      getDefaultPlayer()
    ),
    avatarList: [
      Avatar_1,
      Avatar_2,
      Avatar_3,
      Avatar_4,
      Avatar_5,
      Avatar_6,
      Avatar_7,
      Avatar_8,
      Avatar_9,
    ],
  }),

  actions: {
    setMe(player: I_BasePlayer) {
      const patchedPlayer = { ...this.me, ...player };
      this.me = patchedPlayer;
      localStorage.set("player", patchedPlayer);
    },

    logout() {
      this.setMe(getDefaultPlayer());
      const socketStore = useSocketStore();
      socketStore.disconnect();
      socketStore.connect();
    },
  },

  getters: {
    isAuthenticated: (state) => state.me._id !== "",
  },
});
