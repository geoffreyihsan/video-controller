import { createRouter, createWebHistory } from "vue-router";
import TouchHere from "./components/TouchHere.vue";
import Player from "./components/Player.vue";
import Controller from "./components/Controller.vue";

const routes = [
  { path: "/", component: TouchHere },
  { path: "/player", component: Player },
  { path: "/controller", component: Controller },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
