<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const emit = defineEmits(["agregarTarea"]);

const schema = yup.object({
  nuevaTarea: yup
    .string()
    .required("La tarea es obligatoria")
    .min(3, "Debe tener al menos 3 caracteres"),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });

const { value: nuevaTarea, errorMessage, handleBlur } = useField("nuevaTarea");

const enviarTarea = handleSubmit((values) => {
  emit("agregarTarea", values.nuevaTarea);
  resetForm();
});
</script>

<template>
  <form @submit.prevent="enviarTarea">
    <input v-model="nuevaTarea" @blur="handleBlur" placeholder="Escribe una tarea" />
    <span style="color: red; font-size: 0.8rem">{{ errorMessage }}</span>
    <button type="submit">Agregar</button>
  </form>
</template>
