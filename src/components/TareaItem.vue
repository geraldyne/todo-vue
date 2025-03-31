<script setup>
import { ref, watch } from "vue";

const props = defineProps(["tarea"]);
const emit = defineEmits(["toggleCompletada", "eliminarTarea", "editarTarea", "guardarTarea"]);

const textoLocal = ref(props.tarea.texto);

watch(
  () => props.tarea.texto,
  (nuevoTexto) => {
    textoLocal.value = nuevoTexto;
  }
);

const toggle = () => emit("toggleCompletada", props.tarea.id);
const eliminar = () => emit("eliminarTarea", props.tarea.id);
const editar = () => emit("editarTarea", props.tarea.id);
const guardar = () => emit("guardarTarea", { id: props.tarea.id, texto: textoLocal.value });
</script>

<template>
  <li>
    <input type="checkbox" :checked="tarea.completada" @change="toggle" />
    <template v-if="!tarea.editando">
      <span :class="{ completada: tarea.completada }">{{ tarea.texto }}</span>
      <button @click="editar">✏️</button>
    </template>
    <template v-else>
      <input v-model="textoLocal" @keyup.enter="guardar" />
      <button @click="guardar">💾</button>
    </template>
    <button @click="eliminar">❌</button>
  </li>
</template>

<style scoped>
.completada {
  text-decoration: line-through;
  color: gray;
}
</style>
