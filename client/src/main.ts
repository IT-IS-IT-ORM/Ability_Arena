// Vue
import { createApp } from "vue";
// Router
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/constants/routes";
// Pinia
import { createPinia } from "pinia";
// Component
import App from "@/components/App.vue";
// Utils
import { localStorage } from "@/utils/localStorage";

// Global CSS Files
import "@/assets/style/variable.css";
import "@/assets/style/reset.css";

const app = createApp(App);

// 路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Store
const pinia = createPinia();

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.get<string, boolean>("token", false);
    !token && next("/login");
  }
  next();
});

app.use(router);
app.use(pinia);

app.mount("#app");
