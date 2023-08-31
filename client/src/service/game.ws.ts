export const WS_GameURI = (roomId: number, token: string) =>
  `ws://127.0.0.1:8000/ws/game/${roomId}/?token=${token}`;
