import { tasksApi } from './tasksApi';

export const getTasks = () => {
  return tasksApi.getAll().then((data) => ({ data }));
};

export const createTask = (text) => {
  return tasksApi.create(text).then((data) => ({ data }));
};

export const updateTask = (id, text) => {
  return tasksApi.update(id, text).then((data) => ({ data }));
};

export const deleteTaskAPI = (id) => {
  return tasksApi.delete(id);
};

export const toggleCompletedAPI = (id) => {
  return tasksApi.toggle(id);
};
