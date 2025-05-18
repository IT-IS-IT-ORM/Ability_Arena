export default [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/Main.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/hero",
    name: "hero",
    component: () => import("@/views/Hero.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/thing",
    name: "thing",
    component: () => import("@/views/Thing.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/wiki",
    name: "wiki",
    component: () => import("@/views/Wiki.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/game",
    name: "game",
    component: () => import("@/views/Game.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];
