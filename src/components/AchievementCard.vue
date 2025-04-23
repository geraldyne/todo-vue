<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const tasks = computed(() => store.getters.tasks);
const total = computed(() => tasks.value.length);
const completed = computed(() => tasks.value.filter((t) => t.completed).length);
const pending = computed(() => total.value - completed.value);
const series = computed(() => [completed.value, pending.value]);
const chartOptions = {
  labels: ['Completed', 'Pending'],
  colors: ['#653e4d', '#f6c453'],
  legend: {
    show: false,
    position: 'bottom',
  },
  dataLabels: {
    enabled: false,
    formatter: function (val) {
      return val.toFixed(1) + '%';
    },
  },
  tooltip: {
    y: {
      formatter: (val) => `${val} task`,
    },
  },
  stroke: {
    show: false,
  },
};
</script>

<template>
  <div class="achievement-card">
    <h2>Achievements</h2>
    <div class="stats">
      <apexchart type="donut" height="150" :options="chartOptions" :series="series" />
      <div class="stats-container">
        <div class="stat completed">
          <span class="label">Done</span>
          <span class="value">{{ completed }}</span>
        </div>
        <div class="stat pending">
          <span class="label">Pending</span>
          <span class="value">{{ pending }}</span>
        </div>
        <div class="stat total">
          <span class="label">Total</span>
          <span class="value">{{ total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';

.achievement-card {
  background: @scroll-background;
  padding: 20px;
  width: 250px;
  font-family: @font-stack;

  h2 {
    margin: 0;
    color: @eggplant;
    font-size: 20px;
  }

  .stats {
    display: flex;
    flex-direction: column;
    .stats-container {
      display: flex;
      gap: 10px;

      .stat {
        border: 1px solid @beige-soft;
        border-radius: 8px;
        padding: 5px;
        min-width: 65px;
        text-align: center;
        background: @beige-soft;

        .label {
          display: block;
          font-weight: bold;
          color: #555;
        }

        .value {
          display: block;
          font-size: 19px;
          color: @eggplant;
        }
      }
    }
  }
}
</style>
