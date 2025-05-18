import { apiRouter } from "#router/index.js";
import { UserApi } from "#apps/user/main.js";

const userApi = new UserApi();

apiRouter.get("/user", userApi.list);
apiRouter.get("/user/:id", userApi.retrieve);
apiRouter.patch("/user/:id", userApi.partialUpdate);
apiRouter.delete("/user/:id", userApi.delete);
