export default [
  {
    path: "/",
    name: "main",
    redirect: "/game",
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/hero",
    name: "hero",
    component: () => import("@/views/Hero.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/items",
    name: "items",
    component: () => import("@/views/Items.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/wiki",
    name: "wiki",
    component: () => import("@/views/Wiki.vue"),
    meta: {
      requiresAuth: false,
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
  {
    path: "/room/:id",
    name: "room",
    component: () => import("@/views/Room.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];
