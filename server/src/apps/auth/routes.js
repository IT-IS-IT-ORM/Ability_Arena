import { apiRouter } from "#src/router/index.js";
import { AuthApi } from "#apps/auth/main.js";

const authApi = new AuthApi();

apiRouter.post("/auth/create", authApi.create);
apiRouter.post("/auth/login", authApi.login);
