type ID = number;

export interface I_Room {
  id: ID;
  name: string;
  maxMemberCount: number;
  homeowner: ID;
  password?: string;
  member: { id: ID; member: ID }[];
}
