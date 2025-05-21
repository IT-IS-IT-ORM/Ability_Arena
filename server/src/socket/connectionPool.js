import Player from "#src/db/collections/player.js";

class ConnectionPool {
  constructor() {
    /**
     * @type {Map<string, Socket>}
     */
    this.pool = new Map();
  }

  async addConnection(playerId, socket) {
    this.pool.set(playerId, socket);
    await this.updatePlayerStatus(playerId, true);
  }

  async removeConnection(playerId) {
    this.pool.delete(playerId);
    await this.updatePlayerStatus(playerId, false);
  }

  getConnection(playerId) {
    return this.pool.get(playerId);
  }

  getAllOnlinePlayers() {
    return Array.from(this.pool.keys());
  }

  // 更新玩家在线状态
  async updatePlayerStatus(playerId, isOnline) {
    await Player.findByIdAndUpdate(playerId, { isOnline });
  }
}

export const connectionPool = new ConnectionPool();
