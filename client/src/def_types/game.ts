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
  messageType: string[];
  messageTime: string;
  data: T;
}

export interface I_PlaerMessage {
  content: string;
  sender: I_User;
}

export interface I_WS_ChatMessage
  extends I_WS_Message<I_User | I_PlaerMessage> {}
