// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TasksView from '@/views/TasksView.vue';

const routes = [{ path: '/', name: 'Tareas', component: TasksView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
