import { apiRouter } from "#root/router/index.js";
import { AuthApi } from "#apps/auth/main.js";

const authApi = new AuthApi();

apiRouter.post("/auth/verify-code", authApi.getVerifyCode);
apiRouter.post("/auth/register", authApi.register);
apiRouter.post("/auth/login", authApi.login);
apiRouter.post("/auth/reset-password", authApi.resetPassword);
