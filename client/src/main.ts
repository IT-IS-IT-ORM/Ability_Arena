// Vue
import { createApp } from "vue";
// Router
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/constants/routes";
// Pinia
import { createPinia } from "pinia";
// i18n
import i18nInstance from "@/i18n/index";
// Component
import App from "@/components/App.vue";

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

app.use(router);
app.use(pinia);
app.use(i18nInstance);

app.mount("#app");
