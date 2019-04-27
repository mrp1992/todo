var dbUtil = require('../todoDao/dbUtil');

exports.addTodo = function(todoTask) {
  console.log(todoTask);
  var isTaskAdded = dbUtil.pushToDb(todoTask);

  console.log('isTaskAdded: ', isTaskAdded);
  return {"taskAdded": isTaskAdded};
}
