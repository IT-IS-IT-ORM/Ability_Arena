import type { allowedRole } from "@/utils";

export interface I_User {
  username: string;
  avatarIdx: number;
  role: allowedRole;
  token: string;
}
