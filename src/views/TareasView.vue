<template>
  <div>
    <h1>Lista de Tareas</h1>
    <TareaInput @agregarTarea="agregarTarea" />
    <ul>
      <TareaItem
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @toggleCompletada="toggleCompletada"
        @eliminarTarea="eliminarTarea"
        @editarTarea="editarTarea"
      />
    </ul>
    <p>Total de tareas: {{ totalTareas }}</p>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import TareaInput from "@/components/TareaInput.vue";
import TareaItem from "@/components/TareaItem.vue";

const store = useStore();

const tareas = computed(() => store.getters.tareas);
const totalTareas = computed(() => store.getters.totalTareas);

const agregarTarea = (texto) => {
  store.dispatch("agregarTarea", texto);
};

const eliminarTarea = (id) => {
  store.dispatch("eliminarTarea", id);
};

const toggleCompletada = (id) => {
  store.dispatch("toggleCompletada", id);
};

const editarTarea = (id) => {
  store.dispatch("editarTarea", id);
};

const guardarTarea = ({ id, texto }) => {
  store.dispatch("guardarTarea", { id, nuevoTexto: texto });
};

// Cargar tareas al montar el componente
onMounted(() => {
  store.dispatch("cargarTareas");
});
</script>
