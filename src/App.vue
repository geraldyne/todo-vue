<script setup></script>

<template>
  <div>
    <h1>Mi App Vue + Vuex + Vue Router</h1>

    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/acerca">Acerca</router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
nav {
  margin-bottom: 20px;
}
router-link {
  margin: 0 10px;
}
.container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
.lista-tareas {
  list-style: none;
  padding: 0;
}
</style>
