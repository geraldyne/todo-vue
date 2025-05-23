import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';
import router from './router';
import VueApexCharts from 'vue3-apexcharts';

createApp(App).use(store).use(router).use(VueApexCharts).mount('#app');
