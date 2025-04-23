import { createStore } from 'vuex';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskAPI,
  toggleCompletedAPI,
} from '@/services/tasksService';

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks.map((t) => ({
        id: t.id,
        text: t.text,
        completed: t.completed,
        editing: false,
      }));
    },
    addTask(state, task) {
      state.tasks.unshift({
        id: task.id,
        text: task.text,
        completed: task.completed,
        editing: false,
      });
    },
    toggleCompleted(state, id) {
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },
    removeTask(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    editTask(state, id) {
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.editing = true;
    },
    saveTask(state, { id, newText }) {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.text = newText;
        task.editing = false;
      }
    },
  },
  actions: {
    async listTasks({ commit }) {
      const res = await getTasks();
      commit('setTasks', res.data);
    },
    async addTask({ commit }, text) {
      const res = await createTask(text);
      commit('addTask', res.data);
    },
    async toggleCompleted({ commit }, id) {
      await toggleCompletedAPI(id);
      commit('toggleCompleted', id);
    },
    async removeTask({ commit }, id) {
      await deleteTaskAPI(id);
      commit('removeTask', id);
    },
    async saveTask({ commit }, { id, newText }) {
      await updateTask(id, newText);
      commit('saveTask', { id, newText });
    },
    editTask({ commit }, id) {
      commit('editTask', id);
    },
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
  },
});
