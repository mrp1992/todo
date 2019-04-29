var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = (todoTask) => {
  var isTaskAdded = dbUtil.pushToDb(todoTask);

  return { 'taskAdded': isTaskAdded };
};

exports.updateStatus = (updateStatus) => {
  const task = dbUtil.updateTodoStatus(updateStatus);

  return task;
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
