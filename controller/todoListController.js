var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = (todoTask) => {
  var isTaskAdded = dbUtil.pushToDb(todoTask);

  return { 'taskAdded': isTaskAdded };
};
