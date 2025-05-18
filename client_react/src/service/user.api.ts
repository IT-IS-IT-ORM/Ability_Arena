import type { I_User } from "@/def_types/user";

import fetch from "@/service/fetch";

export interface API_RegisterDate {
  username: string;
  avatarIndex: number;
}

// 暂不需要登录 (Token 永不过期)
// export const API_Login = (data: API_LoginData) =>
//   fetch.post<I_User>("/auth/login", data);

export const API_Register = (data: API_RegisterDate) =>
  fetch.post<I_User>("/auth/register/", data);

export interface API_UpdateProfileData {
  username: string;
  avatarIndex: number;
}

export const API_UpdateProfile = (id: number, data: API_UpdateProfileData) =>
  fetch.patch<I_User>(`/user/${id}/`, data);
