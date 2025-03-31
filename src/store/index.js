import { createStore } from "vuex";
import { obtenerTareas, crearTarea } from "@/services/tareaService";

export default createStore({
  state: {
    tareas: [],
  },
  mutations: {
    setTareas(state, tareas) {
      state.tareas = tareas.map((t) => ({
        id: t.id,
        texto: t.title,
        completada: t.completed,
        editando: false, // <- Para controlar el modo de edición
      }));
    },
    agregarTarea(state, tarea) {
      state.tareas.unshift({
        id: tarea.id,
        texto: tarea.title,
        completada: tarea.completed,
        editando: false,
      });
    },
    toggleCompletada(state, id) {
      const tarea = state.tareas.find((t) => t.id === id);
      if (tarea) tarea.completada = !tarea.completada;
    },
    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter((t) => t.id !== id);
    },
    editarTarea(state, id) {
      const tarea = state.tareas.find((t) => t.id === id);
      if (tarea) tarea.editando = true;
    },
    guardarTarea(state, { id, nuevoTexto }) {
      const tarea = state.tareas.find((t) => t.id === id);
      if (tarea) {
        tarea.texto = nuevoTexto;
        tarea.editando = false;
      }
    },
  },
  actions: {
    async cargarTareas({ commit }) {
      const res = await obtenerTareas();
      commit("setTareas", res.data);
    },
    async agregarTarea({ commit }, texto) {
      const res = await crearTarea(texto);
      commit("agregarTarea", res.data);
    },
    toggleCompletada({ commit }, id) {
      commit("toggleCompletada", id);
    },
    eliminarTarea({ commit }, id) {
      commit("eliminarTarea", id);
    },
    editarTarea({ commit }, id) {
      commit("editarTarea", id);
    },
    guardarTarea({ commit }, payload) {
      commit("guardarTarea", payload);
    },
  },
  getters: {
    tareas(state) {
      return state.tareas;
    },
    totalTareas(state) {
      return state.tareas.length;
    },
  },
});
