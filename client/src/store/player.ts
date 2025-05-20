// Type-Def
import type { BasePlayer } from "@/type-def/Player";

// Pinia
import { defineStore } from "pinia";
// Utils
import { localStorage } from "@/utils/localStorage";

const getDefaultPlayer: () => BasePlayer = () => {
  const player = localStorage.get<BasePlayer, BasePlayer>("player", {
    _id: "",
    username: "",
    avatarIndex: 1,
    gold: 0,
    isOnline: false,
  });

  return player;
};

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    me: getDefaultPlayer(),
  }),

  actions: {
    setMe(player: BasePlayer) {
      this.me = player;
      localStorage.set("player", player);
    },
  },

  getters: {
    isAuthenticated: (state) => state.me._id !== "",
  },
});
