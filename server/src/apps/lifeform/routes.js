import { apiRouter } from "#src/router/index.js";
import { LifeformApi } from "#apps/lifeform/main.js";

const lifeformApi = new LifeformApi();

apiRouter.get("/lifeform", lifeformApi.list);
apiRouter.get("/lifeform/:name", lifeformApi.retrieve);
