// Type-Def
import type { I_BasePlayer } from "@/type-def/Player";

// Pinia
import { defineStore } from "pinia";
// Utils
import { localStorage } from "@/utils/localStorage";

const getDefaultPlayer: () => I_BasePlayer = () => {
  const player = localStorage.get<I_BasePlayer, I_BasePlayer>("player", {
    _id: "",
    username: "",
    avatarIndex: 1,
    gold: 0,
    isOnline: false,
    // Client Only
    inRoom: false,
    inGame: false,
  });

  return player;
};

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    me: getDefaultPlayer(),
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
