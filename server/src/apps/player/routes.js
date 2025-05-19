import { apiRouter } from "#src/router/index.js";
import { PlayerApi } from "#apps/player/main.js";

const playerApi = new PlayerApi();

apiRouter.get("/player", playerApi.list);
apiRouter.get("/player/:id", playerApi.retrieve);
apiRouter.patch("/player/:id", playerApi.partialUpdate);
apiRouter.delete("/player/:id", playerApi.delete);
