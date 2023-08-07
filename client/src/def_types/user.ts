import type { allowedRole } from "@/utils";

export interface I_User {
  id: number;
  username: string;
  avatarIndex: number;
  role: allowedRole;
  token: string;
  createTime: string;
}
