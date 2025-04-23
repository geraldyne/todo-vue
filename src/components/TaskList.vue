<script setup>
import { ref } from 'vue';
import EditIcon from '@/assets/icons/editIcon.svg';
import DeleteIcon from '@/assets/icons/deleteIcon.svg';

const props = defineProps({
  tasks: Array,
});

const emit = defineEmits(['addTask', 'removeTask', 'editTask', 'saveTask', 'toggleCompleted']);

const newTask = ref('');

const add = () => {
  if (newTask.value.trim()) {
    emit('addTask', newTask.value.trim());
    newTask.value = '';
  }
};

const saveTask = (task) => {
  emit('saveTask', { id: task.id, text: task.text });
};
</script>

<template>
  <div class="notebook">
    <div class="input-box">
      <input
        type="text"
        v-model="newTask"
        placeholder="What needs to be done?"
        @keyup.enter="add"
      />
      <button @click="add">Add</button>
    </div>

    <ul class="tasks">
      <li
        v-for="task in tasks"
        :key="task.id"
        :class="['task-item', { completed: task.completed }]"
      >
        <div class="content">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="$emit('toggleCompleted', task.id)"
          />

          <input
            v-if="task.editing"
            type="text"
            v-model="task.text"
            @keyup.enter="saveTask(task)"
            class="edit-input"
          />
          <span v-else>{{ task.text }}</span>

          <div class="actions">
            <EditIcon class="edit clickable" @click="$emit('editTask', task.id)" />
            <DeleteIcon class="remove clickable" @click="$emit('removeTask', task.id)" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';

.notebook {
  background-color: @beige-soft;
  border-radius: 16px;
  padding: 32px 40px;
  color: @text-light;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 278px;
  &::before {
    content: '';
    position: absolute;
    left: -24px;
    top: 32px;
    width: 40px;
    height: 32px;
    background: @scroll-background;
    border-radius: 40px;
    box-shadow: 0 80px 0 @scroll-background, 0 160px 0 @scroll-background,
      0 240px 0 @scroll-background;
  }
  .input-box {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    input[type='text'] {
      flex: 1;
      padding: 9px 16px;
      border-radius: 8px;
      border: none;
      outline: none;
      background: @input-background;
      font-size: 16px;
      color: #333;
    }

    button {
      background-color: @eggplant;
      color: @white;
      padding: 9px 19px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        background-color: darken(@eggplant, 10%);
      }
    }
  }

  ul.tasks {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    height: 224px;
    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: @scroll-background;
      border: 1px solid @scroll-background;
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: @eggplant;
      width: 3px;
    }

    .task-item {
      background-color: transparent;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      position: relative;

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;

        input[type='checkbox'] {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid @eggplant;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          background: transparent;

          &:checked {
            background-color: @eggplant;

            &::after {
              content: '';
              position: absolute;
              top: 2px;
              left: 6px;
              width: 4px;
              height: 8px;
              border: solid @white;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
            }
          }
        }

        .edit-input {
          flex: 1;
          font-size: 16px;
          background: @input-background;
          border-radius: 6px;
          padding: 5px 10px;
          border: none;
          outline: none;
          color: #333;
        }

        span {
          flex: 1;
          font-size: 16px;
        }

        .actions {
          display: flex;
          gap: 8px;

          svg {
            height: 20px;
            width: 20px;
            cursor: pointer;

            &.edit {
              color: @golden;
            }

            &.remove {
              color: @pink-blush;
            }

            &:hover {
              opacity: 0.8;
            }
          }
        }
      }

      &.completed {
        opacity: 0.6;
        text-decoration: line-through;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 26px;
  }
}
</style>
