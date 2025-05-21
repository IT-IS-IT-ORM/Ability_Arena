import Game from "#src/db/collections/game.js";

const gameCache = new Map();

// 初始化游戏相关的事件处理
export function initGameHandlers(io, socket) {
  // 开始游戏
  socket.on("game:start", async (roomId, callback) => {
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return callback({ success: false, error: "房间不存在" });
      }

      if (room.creator !== socket.playerId) {
        return callback({ success: false, error: "只有房主可以开始游戏" });
      }

      // 创建新游戏
      const game = await Game.create({
        room: roomId,
        players: room.members,
      });

      gameCache.set(game._id.toString(), {
        ...game.toObject(),
        actions: [],
      });

      // 通知房间内所有玩家游戏开始
      io.to(roomId).emit("game:started", {
        gameId: game._id,
        players: room.members,
      });

      callback({ success: true, game });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 结束游戏
  socket.on("game:end", async (gameId, callback) => {
    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return callback({ success: false, error: "游戏不存在" });
      }

      game.status = "ended";
      game.endAt = new Date();
      await game.save();

      gameCache.delete(gameId);

      // 通知房间内所有玩家游戏结束
      io.to(game.roomId).emit("game:ended", {
        gameId,
        endAt: game.endAt,
      });

      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 玩家行动
  socket.on("game:action", async (data, callback) => {
    try {
      const { gameId, action } = data;
      const game = await Game.findById(gameId);

      if (!game || game.status !== "playing") {
        return callback({ success: false, error: "游戏不存在或已结束" });
      }

      if (!game.players.includes(socket.playerId)) {
        return callback({ success: false, error: "你不是游戏玩家" });
      }

      const gameData = gameCache.get(gameId);

      if (!gameData) {
        return callback({ success: false, error: "游戏数据不存在" });
      }

      // 记录玩家行动
      gameData.actions.push({
        playerId: socket.playerId,
        action,
        timestamp: new Date(),
      });

      // 广播玩家行动给房间内所有玩家
      io.to(game.roomId).emit("game:action", {
        playerId: socket.playerId,
        action,
        timestamp: new Date(),
      });

      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 获取游戏状态
  socket.on("game:status", async (gameId, callback) => {
    try {
      const game = await Game.findById(gameId);
      if (!game) {
        return callback({ success: false, error: "游戏不存在" });
      }

      const gameData = gameCache.get(gameId);
      callback({
        success: true,
        game,
        actions: gameData?.actions || [],
      });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
}
