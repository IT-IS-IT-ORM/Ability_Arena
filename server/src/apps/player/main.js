import Player from "#src/db/collections/player.js";
import { PlayerSerializer } from "#apps/player/serializer.js";

export class PlayerApi {
  constructor() {
    this.playerModel = Player;
  }

  list = async (ctx) => {
    const players = await this.playerModel.find();
    const serializedPlayers = await Promise.all(
      players.map((player) => new PlayerSerializer(player).toJSON())
    );

    ctx.body = {
      data: serializedPlayers,
    };
    ctx.status = 200;
  };

  retrieve = async (ctx) => {
    const { id } = ctx.params;
    const player = await this.playerModel.findById(id);

    if (!player) {
      ctx.status = 404;
      return;
    }

    ctx.body = {
      data: await new PlayerSerializer(player).toJSON(),
    };
    ctx.status = 200;
  };

  partialUpdate = async (ctx) => {
    const { id } = ctx.params;

    if (!ctx.isAuthenticated) {
      ctx.status = 401;
      return;
    }

    const updatedPlayer = await this.playerModel.findOneAndUpdate(
      { _id: id },
      ctx.request.body,
      { new: true }
    );

    ctx.body = {
      data: await new PlayerSerializer(updatedPlayer).toJSON(),
    };
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const { id } = ctx.params;

    if (!ctx.isAuthenticated) {
      ctx.status = 401;
      return;
    }

    const player = await this.playerModel.findById(id);

    if (!player) {
      ctx.body = {
        message: "玩家不存在",
      };
      ctx.status = 404;
      return;
    }

    await this.playerModel.findByIdAndDelete(id);

    ctx.status = 200;
  };
}
