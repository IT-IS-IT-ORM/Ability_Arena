export const REDIS_KEYS = {
  ROOM_KEY: (roomId) => `room:${roomId}`,
  ROOM_LIST_KEY: "room:list",
};

export const ROOM_STATUS = {
  WAITING: "waiting",
  PLAYING: "playing",
};
