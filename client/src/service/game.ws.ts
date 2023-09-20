export const WS_GameURI = (roomId: number, token: string) =>
  `ws://192.168.1.106:8000/ws/game/${roomId}/?token=${token}`;
