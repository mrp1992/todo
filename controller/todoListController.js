var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = (todoTask) => {
  var isTaskAdded = dbUtil.pushToDb(todoTask);

  return { 'taskAdded': isTaskAdded };
};

exports.updateStatus = (updateStatus) => {
  var isStatusUpdated = dbUtil.updateTodoStatus(updateStatus);

  return { 'taskUpdated': isStatusUpdated };
};
