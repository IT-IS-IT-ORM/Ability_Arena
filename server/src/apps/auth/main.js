import Player from "#src/db/collections/player.js";
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
    const { username } = ctx.request.body;

    const player = await this.playerModel.findOne({ username });

    if (!player) {
      ctx.body = {
        message: "auth.account_does_not_exist",
      };
      ctx.status = 400;
      return;
    }

    if (player.isOnline) {
      ctx.body = {
        message: "auth.account_already_online",
      };
      ctx.status = 400;
      return;
    }

    ctx.body = {
      data: await new PlayerSerializer(player).toJSON(),
    };
    ctx.status = 200;
  };
}
