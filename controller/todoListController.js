var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = (todoTask) => dbUtil.pushToDb(todoTask);

exports.updateStatus = (updateStatus) => dbUtil.updateTodoStatus(updateStatus);

exports.fetchTodoTask = (taskStatus, userId) => {
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

exports.removeTodo = (removeTask) => {
  const isTaskRemoved = dbUtil.removeTodo(removeTask);

  return { taskRemoved: isTaskRemoved };
};
