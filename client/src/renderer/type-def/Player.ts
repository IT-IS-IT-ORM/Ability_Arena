export interface I_BasePlayer {
  _id: string;
  username: string;
  avatarIndex: number;
  mmr: number;
  isOnline: boolean;
  team: number | null;
  inRoom: boolean;
  inGame: boolean;
}
