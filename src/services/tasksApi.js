let tasksMock = [
  { id: 1, text: 'Review pull requests', completed: false },
  { id: 2, text: 'Update project documentation', completed: true },
  { id: 3, text: 'Plan next sprint tasks', completed: false },
  { id: 4, text: 'Fix user login issue (#213)', completed: true },
  { id: 5, text: 'Test mobile responsiveness', completed: false },
];

let nextId = 6;

export const tasksApi = {
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...tasksMock]);
      }, 500);
    });
  },

  create(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: nextId++,
          text,
          completed: false,
        };
        tasksMock.push(newTask);
        resolve(newTask);
      }, 500);
    });
  },

  update(id, text) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = tasksMock.find((t) => t.id === id);
        if (task) {
          task.text = text;
          resolve(task);
        } else {
          reject(new Error('Task not found'));
        }
      }, 500);
    });
  },

  toggle(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = tasksMock.find((t) => t.id === id);
        if (task) {
          task.completed = !task.completed;
          resolve(task);
        } else {
          reject(new Error('Task not found'));
        }
      }, 500);
    });
  },

  delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasksMock = tasksMock.filter((t) => t.id !== id);
        resolve();
      }, 500);
    });
  },
};
