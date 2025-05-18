export const WS_GameURI = (roomId: number, token: string) =>
  `ws://192.168.99.38:8000/ws/game/${roomId}/?token=${token}`;
