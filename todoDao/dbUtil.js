const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var ServiceException = require('../exception/serviceException');

const adapter = new FileSync('./dataStore/db.json');
const db = low(adapter);

var todoId = 0;

db.defaults({ posts: [] }).write();

exports.pushToDb = (todoTask) => {
  const totalTodos = this.getAllTodo();

  // eslint-disable-next-line no-magic-numbers
  todoId = totalTodos && totalTodos.length + 1;
  db.get('posts').
    push({
      id: todoId,
      taskName: todoTask.taskName,
      taskStatus: todoTask.taskStatus.toUpperCase()
    }).
    write();

  return true;
};

exports.updateTodoStatus = (todoTask) => {
  if (!db.get('posts').find({ id: todoTask.id }).
    value()) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(400, 'No such id present');
  }
  db.get('posts').find({ id: todoTask.id }).
    assign({ taskStatus: todoTask.taskStatus.toUpperCase() }).
    write();

  return true;
};

exports.getAllTodo = (taskStatus) => {
  if (taskStatus) {
    return db.get('posts').filter({ taskStatus: taskStatus.toUpperCase() }).
      value();
  }

  return db.get('posts').value();

};
