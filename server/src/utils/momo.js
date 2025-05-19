import User from "#src/db/collections/player.js";
import { findOrCreate } from "#src/utils/findOrCreate.js";
/**
 * 创建一批用户
 * @param {number} count
 * @returns {Promise<User[]>}
 */
export const createMomoUsers = async (count, onError = undefined) => {
  for (let i = 1; i <= count; i++) {
    try {
      await findOrCreate(User, { username: `momo${i}` });
    } catch (error) {
      onError?.(error);
    }
  }
};
