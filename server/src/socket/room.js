import redisClient from "#src/redis/index.js";
import Player from "#src/db/collections/player.js";

// Redis 键前缀
const ROOM_KEY_PREFIX = "room:";
const ROOM_MEMBERS_PREFIX = "room:members:";
const ROOM_LIST_KEY = "rooms";

// 生成 Redis 键
const getRoomKey = (roomId) => `${ROOM_KEY_PREFIX}${roomId}`;
const getRoomMembersKey = (roomId) => `${ROOM_MEMBERS_PREFIX}${roomId}`;

// 将房间数据转换为 Redis 可存储的格式
const roomToRedis = (room) => ({
  id: room.id,
  name: room.name,
  creator: room.creator,
  createdAt: room.createdAt,
  status: room.status || "waiting",
});

// 从 Redis 数据转换为房间对象
const redisToRoom = (data) => ({
  id: data.id,
  name: data.name,
  creator: data.creator,
  createdAt: new Date(data.createdAt),
  status: data.status,
  // 成员列表需要单独获取
  members: [],
});

export function initRoomHandlers(io, socket) {
  // 统计数据
  socket.on("room:statistics", async (callback) => {
    try {
      const onlinePlayers = await Player.countDocuments({ isOnline: true });
      const roomsCount = await redisClient.scard(ROOM_LIST_KEY);

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

  // 创建房间
  socket.on("room:create", async (roomData, callback) => {
    try {
      const roomId = Date.now().toString();

      const room = {
        id: roomId,
        name: roomData.name,
        creator: socket.playerId,
        createdAt: new Date().toISOString(),
        status: "waiting",
        members: [socket.player],
      };

      // 存储房间基本信息
      await redisClient.hset(getRoomKey(roomId), roomToRedis(room));

      // 存储房间成员
      await redisClient.sadd(getRoomMembersKey(roomId), socket.playerId);

      // 将房间 ID 添加到房间列表
      await redisClient.sadd(ROOM_LIST_KEY, roomId);

      socket.join(roomId);
      callback({ success: true, room });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 加入房间
  socket.on("room:join", async (roomId, callback) => {
    try {
      // 检查房间是否存在
      const roomExists = await redisClient.exists(getRoomKey(roomId));
      if (!roomExists) {
        return callback({ success: false, error: "房间不存在" });
      }

      // 检查是否已经是房间成员
      const isMember = await redisClient.sismember(
        getRoomMembersKey(roomId),
        socket.playerId
      );

      if (isMember) {
        return callback({ success: false, error: "已经在房间中" });
      }

      // 添加成员
      await redisClient.sadd(getRoomMembersKey(roomId), socket.playerId);

      // 获取房间信息
      const roomData = await redisClient.hgetall(getRoomKey(roomId));
      const members = await redisClient.smembers(getRoomMembersKey(roomId));
      const room = {
        ...redisToRoom(roomData),
        members,
      };

      socket.join(roomId);
      io.to(roomId).emit("room:memberJoined", {
        playerId: socket.playerId,
        roomId,
      });

      callback({ success: true, room });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 离开房间
  socket.on("room:leave", async (roomId, callback) => {
    try {
      // 检查房间是否存在
      const roomExists = await redisClient.exists(getRoomKey(roomId));
      if (!roomExists) {
        return callback({ success: false, error: "房间不存在" });
      }

      // 移除成员
      await redisClient.srem(getRoomMembersKey(roomId), socket.playerId);

      // 获取剩余成员数量
      const memberCount = await redisClient.scard(getRoomMembersKey(roomId));

      // 如果房间没有成员了，删除房间
      if (memberCount === 0) {
        await redisClient.del(getRoomKey(roomId));
        await redisClient.del(getRoomMembersKey(roomId));
        await redisClient.srem(ROOM_LIST_KEY, roomId);
      }

      socket.leave(roomId);
      io.to(roomId).emit("room:memberLeft", {
        playerId: socket.playerId,
        roomId,
      });

      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 发送房间消息
  socket.on("room:message", async (data, callback) => {
    try {
      const { roomId, content } = data;

      // 检查是否是房间成员
      const isMember = await redisClient.sismember(
        getRoomMembersKey(roomId),
        socket.playerId
      );

      if (!isMember) {
        return callback({ success: false, error: "你不是房间成员" });
      }

      const message = {
        playerId: socket.playerId,
        content,
        timestamp: new Date().toISOString(),
      };

      io.to(roomId).emit("room:newMessage", message);
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 获取房间列表
  socket.on("room:list", async (callback) => {
    try {
      // 获取所有房间 ID
      const roomIds = await redisClient.smembers(ROOM_LIST_KEY);

      // 获取每个房间的详细信息
      const rooms = await Promise.all(
        roomIds.map(async (roomId) => {
          const roomData = await redisClient.hgetall(getRoomKey(roomId));
          const members = await redisClient.smembers(getRoomMembersKey(roomId));
          return {
            ...redisToRoom(roomData),
            members,
          };
        })
      );

      callback({ success: true, rooms });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });

  // 获取房间详情
  socket.on("room:info", async (roomId, callback) => {
    try {
      // 检查房间是否存在
      const roomExists = await redisClient.exists(getRoomKey(roomId));
      if (!roomExists) {
        return callback({ success: false, error: "房间不存在" });
      }

      // 获取房间信息和成员
      const roomData = await redisClient.hgetall(getRoomKey(roomId));
      const members = await redisClient.smembers(getRoomMembersKey(roomId));

      const room = {
        ...redisToRoom(roomData),
        members,
      };

      callback({ success: true, room });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
}
