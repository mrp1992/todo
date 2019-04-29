var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = (todoTask) => {
  var isTaskAdded = dbUtil.pushToDb(todoTask);

  return { 'taskAdded': isTaskAdded };
};

exports.updateStatus = (updateStatus) => {
  const isTaskUpdated = dbUtil.updateTodoStatus(updateStatus);

  return { taskUpdate: isTaskUpdated };
};

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
