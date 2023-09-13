import type { I_User } from "@/def_types/user";

type ID = number;
type UUID = string;

export interface I_Room {
  id: ID;
  name: string;
  maxMemberCount: number;
  homeowner: ID;
  password?: string;
  memberList: {
    id: ID;
    member: I_User;
  }[];
}

export interface I_WS_Message<T> {
  messageId: UUID;
  messageType: string;
  messageTime: string;
  data: T;
}
