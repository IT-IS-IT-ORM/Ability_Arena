// Pinia
import { defineStore } from "pinia";

export const playerStore = defineStore("playerStore", {
  state: () => ({
    me: {
      id: 19,
      nickname: "Yernar2001",
      email: "toktaryernar@gmail.com",
      avatarIndex: 9,
      mmr: 0,
      createTime: "2024-01-04 00:12:00",
      token: "ejysadkabdkjnsbk.asdkjb787s&sdma.kjbKJBKaj898_sada",
    },
  }),
});
