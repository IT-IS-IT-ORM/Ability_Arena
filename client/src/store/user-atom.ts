import type { I_User } from "@/def_types/user";

import { atom, selector } from "recoil";
import { localStorage, role } from "@/utils";

export interface userStateProperties extends I_User {}

export const defaultUserState: userStateProperties = {
  id: -1,
  username: "Gamer_1234",
  avatarIndex: 5,
  role: role.GUEST,
  token: "",
  createTime: "",
};

const state = localStorage.get("user", defaultUserState);

export const A_User = atom({
  key: "A_User",
  // default value, aka initial value
  default: state,
});

export const S_UserIsAuthenticated = selector({
  key: "S_UserIsAuthenticated",
  get({ get }) {
    const user = get(A_User);
    const hasToken = user.token !== defaultUserState.token;
    const notGuest = user.role !== role.GUEST;

    return hasToken && notGuest;
  },
});
