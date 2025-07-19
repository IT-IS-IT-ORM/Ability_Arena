import { LifeformSerializer } from "#apps/lifeform/serializer.js";

export class LifeformApi {
  list = async (ctx) => {
    const lifeformModules = await import("#core/data/lifeform/index.js");
    console.log("lifeformModules: ", lifeformModules);

    const serializedLifeformList = await Promise.all(
      Object.values(lifeformModules).map(async (lifeform) => {
        console.log("lifeform: ", lifeform);
        return new LifeformSerializer(lifeform).toJSON();
      })
    );

    ctx.body = {
      data: serializedLifeformList,
    };
    ctx.status = 200;
  };

  retrieve = async (ctx) => {
    const { name } = ctx.params;
    let lifeform;
    try {
      lifeform = (await import(`#core/data/lifeform/${name}.js`)).default;
    } catch (error) {
      ctx.body = {
        message: "lifeform.not_found",
      };
      ctx.status = 404;
      return;
    }

    ctx.body = {
      data: await new LifeformSerializer(lifeform).toJSON(),
    };
    ctx.status = 200;
  };
}
