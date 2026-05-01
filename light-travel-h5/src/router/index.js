import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("../views/Mine.vue"),
  },
   {
    path: "/plan",
    name: "Plan",
    component: () => import("../views/Plan.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
