import { createRouter, createWebHistory } from "vue-router";
import Player from "./components/Player.vue";
import Controller from "./components/Controller.vue";

const routes = [
  { path: "/player", component: Player },
  { path: "/controller", component: Controller },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
