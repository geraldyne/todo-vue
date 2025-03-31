// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import TareasView from "@/views/TareasView.vue";
import AcercaDeView from "@/views/AcercaDeView.vue";

const routes = [
  { path: "/", name: "Tareas", component: TareasView },
  { path: "/acerca", name: "Acerca", component: AcercaDeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
