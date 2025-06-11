export interface I_BasePlayer {
  _id: string;
  username: string;
  avatarIndex: number;
  mmr: number;
  isOnline: boolean;
  inRoom: boolean;
  inGame: boolean;
}
