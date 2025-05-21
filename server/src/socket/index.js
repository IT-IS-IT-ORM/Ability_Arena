import { Server } from "socket.io";
import Player from "#src/db/collections/player.js";
import { PlayerSerializer } from "#src/apps/player/serializer.js";

import { connectionPool } from "#src/socket/connectionPool.js";
import { initRoomHandlers } from "#src/socket/room.js";
import { initGameHandlers } from "#src/socket/game.js";

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // Socket.IO 中间件 - 身份验证
  io.use(async (socket, next) => {
    const playerId = socket.handshake.auth.playerId;

    if (playerId) {
      const player = await Player.findById(playerId);

      if (player) {
        socket.player = await new PlayerSerializer(player).toJSON();
        socket.playerId = playerId;
      }
    }

    next();
  });

  // Socket.IO 连接处理
  io.on("connection", async (socket) => {
    const playerId = socket.playerId;
    const playerUsername = socket.player.username;
    console.log(`玩家 ${playerUsername} 已连接`);

    await connectionPool.addConnection(playerId, socket);

    initRoomHandlers(io, socket);
    initGameHandlers(io, socket);

    socket.on("disconnect", async () => {
      console.log(`玩家 ${playerUsername} 已断开连接`);
      await connectionPool.removeConnection(playerId);
    });
  });

  return io;
}
