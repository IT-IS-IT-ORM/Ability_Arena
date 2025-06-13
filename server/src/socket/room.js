// Redis
import redisClient from "#src/redis/index.js";
// DB
import Player from "#src/db/collections/player.js";
// Constants
import socketEvent from "#src/constants/socketEvent.js";
import { ROOM_STATUS, REDIS_KEYS } from "#src/constants/room.js";

export function initRoomHandlers(io, socket) {
  socket.on(socketEvent.room.statistics, async (callback) => {
    try {
      const onlinePlayers = await Player.countDocuments({ isOnline: true });
      const roomsCount = await redisClient.scard(REDIS_KEYS.ROOM_LIST_KEY);

      callback({
        success: true,
        statistics: {
          onlinePlayers,
          roomsCount,
        },
      });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.create, async (roomData, callback) => {
    if (!socket.player) {
      return callback({ success: false, error: "Player not found" });
    }

    try {
      const roomId = Date.now().toString();

      const room = {
        _id: roomId,
        name: roomData.name,
        creator: socket.playerId,
        createdAt: Date.now(),
        status: ROOM_STATUS.WAITING,
        members: [socket.player],
      };

      await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);
      await redisClient.sadd(REDIS_KEYS.ROOM_LIST_KEY, roomId);

      socket.join(roomId);
      callback({ success: true, room });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.join, async (roomId, callback) => {
    if (!socket.player) {
      return callback({ success: false, error: "Player not found" });
    }

    try {
      const roomExists = await redisClient.exists(REDIS_KEYS.ROOM_KEY(roomId));

      if (!roomExists) {
        return callback({ success: false, error: "Room not found" });
      }

      const room = await redisClient.hgetall(REDIS_KEYS.ROOM_KEY(roomId));
      const maxPlayers = 10;
      const memberCount = room.members.length;

      if (memberCount === maxPlayers) {
        return callback({ success: false, error: "Room is full" });
      }

      room.members.push(socket.player);
      await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);

      socket.join(roomId);

      io.to(roomId).emit(socketEvent.room.join, {
        player: socket.player,
        timestamp: Date.now(),
      });

      callback({ success: true, room });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.leave, async (roomId, callback) => {
    if (!socket.player) {
      return callback({ success: false, error: "Player not found" });
    }

    try {
      const roomExists = await redisClient.exists(REDIS_KEYS.ROOM_KEY(roomId));

      if (!roomExists) {
        return callback({ success: false, error: "Room not found" });
      }

      const room = await redisClient.hgetall(REDIS_KEYS.ROOM_KEY(roomId));

      room.members = room.members.filter(
        (member) => member.id !== socket.playerId
      );
      await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);

      const memberCount = room.members.length;

      if (memberCount === 0) {
        await redisClient.del(REDIS_KEYS.ROOM_KEY(roomId));
        await redisClient.srem(REDIS_KEYS.ROOM_LIST_KEY, roomId);
      } else {
        io.to(roomId).emit(socketEvent.room.leave, {
          player: socket.player,
          timestamp: Date.now(),
        });

        if (room.creator === socket.playerId) {
          room.creator = room.members[0]._id;
          await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);
        }
      }

      socket.leave(roomId);

      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.message, async (data, callback) => {
    if (!socket.player) {
      return callback({ success: false, error: "Player not found" });
    }

    try {
      const { roomId, content } = data;

      const message = {
        playerId: socket.playerId,
        content,
        timestamp: Date.now(),
      };

      io.to(roomId).emit(socketEvent.room.message, message);
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.notification, async (data, callback) => {
    try {
      const { roomId, content } = data;

      const notification = {
        playerId: socket.playerId,
        content,
        timestamp: Date.now(),
      };

      io.to(roomId).emit(socketEvent.room.notification, notification);
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.list, async (callback) => {
    try {
      const roomIds = await redisClient.smembers(REDIS_KEYS.ROOM_LIST_KEY);

      const rooms = await Promise.all(
        roomIds.map(async (roomId) => {
          const room = await redisClient.hgetall(REDIS_KEYS.ROOM_KEY(roomId));
          return room;
        })
      );

      callback({ success: true, rooms });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  socket.on(socketEvent.room.detail, async (roomId, callback) => {
    try {
      const roomExists = await redisClient.exists(REDIS_KEYS.ROOM_KEY(roomId));

      if (!roomExists) {
        return callback({ success: false, error: "Room not found" });
      }

      const room = await redisClient.hgetall(REDIS_KEYS.ROOM_KEY(roomId));

      callback({ success: true, room });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
}
