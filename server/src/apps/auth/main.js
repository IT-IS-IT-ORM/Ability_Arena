// Socket
import { connectionPool } from "#src/socket/connectionPool.js";
// DB
import Player from "#src/db/collections/player.js";
// Serializer
import { PlayerSerializer } from "#apps/player/serializer.js";

export class AuthApi {
  constructor() {
    this.playerModel = Player;
  }

  create = async (ctx) => {
    const { username } = ctx.request.body;

    const player = await this.playerModel.create({ username });

    ctx.body = {
      data: await new PlayerSerializer(player).toJSON(),
    };
  };

  login = async (ctx) => {
    const { username, avatarIndex } = ctx.request.body;

    let player = await this.playerModel.findOne({ username });

    if (!player) {
      ctx.body = {
        message: "auth.account_does_not_exist",
      };
      ctx.status = 400;
      return;
    }

    if (player.isOnline) {
      const socket = connectionPool.getConnection(player.id);

      if (socket) {
        ctx.body = {
          message: "auth.account_already_online",
        };

        ctx.status = 400;
        return;
      }
    }

    // 更新玩家头像
    await this.playerModel.updateOne(
      { _id: player._id },
      { $set: { avatarIndex } }
    );
    player.avatarIndex = avatarIndex;

    ctx.body = {
      data: await new PlayerSerializer(player).toJSON(),
    };
    ctx.status = 200;
  };
}
