// Type-Def
import type { I_BasePlayer } from "@/type-def/Player";

// Pinia
import { defineStore } from "pinia";
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

const getDefaultPlayer: () => I_BasePlayer = () => {
  const player = localStorage.get<I_BasePlayer, I_BasePlayer>("player", {
    _id: "",
    username: "",
    avatarIndex: 1,
    mmr: 0,
    isOnline: false,
    team: null,
    // Client Only
    inRoom: false,
    inGame: false,
  });

  return player;
};

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    me: getDefaultPlayer(),
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
  },

  getters: {
    isAuthenticated: (state) => state.me._id !== "",
  },
});
