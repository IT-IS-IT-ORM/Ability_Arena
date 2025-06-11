import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 2333,
  },

  root: path.join(import.meta.dirname, "src", "renderer"),

  resolve: {
    alias: {
      "@": path.resolve(path.resolve(), "./src/renderer"),
    },
  },

  plugins: [vue()],

  define: {
    // 启用生产环境构建下激活不匹配的详细警告
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
  },

  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: "last 2 versions",
        }),
      ],
    },

    preprocessorOptions: {
      scss: {
        api: "modern",
        additionalData: '@use "@/assets/style/mixins.scss" as *;',
      },
    },
  },
});
