export interface I_BasePlayer {
  _id: string;
  username: string;
  avatarIndex: number;
  gold: number;
  isOnline: boolean;
  inRoom: boolean;
  inGame: boolean;
}
