var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = (todoTask) => {
  var isTaskAdded = dbUtil.pushToDb(todoTask);

  return { 'taskAdded': isTaskAdded };
};

exports.updateStatus = (updateStatus) => {
  const isStatusUpdated = dbUtil.updateTodoStatus(updateStatus);

  return { 'taskUpdated': isStatusUpdated };
};

exports.fetchTodoTask = (taskStatus) => {
  const tasks = dbUtil.getAllTodo(taskStatus);

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
