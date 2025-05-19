import { mediaRouter } from "#src/router/index.js";
import { MediaApi } from "#apps/media/main.js";

const mediaApi = new MediaApi();

mediaRouter.get(/.*/, mediaApi.get);
