// Redis
import redisClient from "#src/redis/index.js";
// DB
import Player from "#src/db/collections/player.js";
// Constants
import socketEvent from "#src/constants/socketEvent.js";
import { ROOM_STATUS, REDIS_KEYS } from "#src/constants/room.js";

async function getRooms() {
  const roomIds = await redisClient.smembers(REDIS_KEYS.ROOM_LIST_KEY);

  const rooms = await Promise.all(
    roomIds.map(async (roomId) => {
      const room = await redisClient.hgetall(REDIS_KEYS.ROOM_KEY(roomId));
      room.members = JSON.parse(room.members);
      return room;
    })
  );

  return rooms;
}

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
        members: JSON.stringify([socket.player]),
      };

      await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);
      await redisClient.sadd(REDIS_KEYS.ROOM_LIST_KEY, roomId);

      room.members = JSON.parse(room.members);

      socket.join(roomId);

      io.emit(socketEvent.room.list, await getRooms());

      callback({ success: true, room });
    } catch (error) {
      console.log("error", error);
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
      room.members = JSON.parse(room.members);
      const maxPlayers = 10;
      const memberCount = room.members.length;

      if (memberCount === maxPlayers) {
        return callback({ success: false, error: "Room is full" });
      }

      room.members.push(socket.player);
      room.members = JSON.stringify(room.members);
      await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);
      room.members = JSON.parse(room.members);

      socket.join(roomId);

      io.to(roomId).emit(socketEvent.room.join, {
        player: socket.player,
        timestamp: Date.now(),
      });
      io.emit(socketEvent.room.list, await getRooms());

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

      room.members = JSON.parse(room.members);
      room.members = room.members.filter(
        (member) => member._id !== socket.playerId
      );

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
        }
      }

      room.members = JSON.stringify(room.members);
      await redisClient.hset(REDIS_KEYS.ROOM_KEY(roomId), room);

      io.emit(socketEvent.room.list, await getRooms());
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
      const rooms = await getRooms();
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
