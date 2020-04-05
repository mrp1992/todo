import * as dbUtil from '../todoDao/dbUtil';

export const addTodo = (todoTask) => dbUtil.pushToDb(todoTask);

export const updateStatus = (status) => dbUtil.updateTodoStatus(status);

export const fetchTodoTask = (taskStatus, userId) => {
  const tasks = dbUtil.getFilteredTodo(taskStatus, userId);

  const allTasks = [];

  tasks.forEach((task) => {
    allTasks.push({
      id: task.id,
      task: task.taskName,
      taskStatus: task.taskStatus
    });
  });

  return allTasks;
};

export const removeTodo = (removeTask) => {
  const isTaskRemoved = dbUtil.removeTodo(removeTask);

  return { taskRemoved: isTaskRemoved };
};
