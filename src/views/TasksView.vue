<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import AchievementCard from '@/components/AchievementCard.vue';
import TaskList from '@/components/TaskList.vue';

const store = useStore();

const tasks = computed(() => store.getters.tasks);

const addTask = (text) => {
  store.dispatch('addTask', text);
};

const removeTask = (id) => {
  store.dispatch('removeTask', id);
};

const toggleCompleted = (id) => {
  store.dispatch('toggleCompleted', id);
};

const editTask = (id) => {
  store.dispatch('editTask', id);
};

const saveTask = ({ id, text }) => {
  store.dispatch('saveTask', { id, newText: text });
};

onMounted(() => {
  store.dispatch('listTasks');
});
</script>

<template>
  <div class="tasks-view">
    <div class="card">
      <header class="header">
        <h1 class="title">Todo list</h1>
        <p class="subtitle">
          A simple and effective task manager that lets you add, edit, mark as completed, and delete
          tasks. Stay organized by keeping track of what needs to be done and what you've already
          accomplished.
        </p>
      </header>

      <div class="content-container">
        <div>
          <AchievementCard />
        </div>

        <TaskList
          :tasks="tasks"
          @addTask="addTask"
          @removeTask="removeTask"
          @editTask="editTask"
          @saveTask="saveTask"
          @toggleCompleted="toggleCompleted"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';

.tasks-view {
  max-width: 992px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  font-family: @font-stack;
  .card {
    background: @scroll-background;
    border: 1px solid @notebook-border;
    box-shadow: 2px 6px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 20px;
  }
  .header {
    text-align: center;
    margin-bottom: 30px;

    .title {
      font-size: 30px;
      color: @eggplant;
      margin: 0;
    }

    .subtitle {
      font-size: 16px;
      color: @text-light;
      margin: 0;
    }
  }

  .content-container {
    display: flex;
    justify-content: center;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
