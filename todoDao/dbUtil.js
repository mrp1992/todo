const { db } = require('./db');
const ServiceException = require('../exception/serviceException');

var todoId = 0;

db.defaults({ posts: [] }).write();

exports.pushToDb = (todoTask) => {
  const totalTodos = this.getAllTodos();

  // eslint-disable-next-line no-magic-numbers
  todoId = totalTodos && totalTodos.length + 1;
  const task = {
    id: todoId,
    taskName: todoTask.taskName,
    taskStatus: todoTask.taskStatus.toUpperCase(),
    user: todoTask.userId
  };

  db.get('posts').
    push(task).
    write();

  return task;
};

const getPostsByIdAndUser = (id, user) => {
  return db.get('posts').find({
    id,
    user
  });
};

exports.updateTodoStatus = (todoTask) => {
  const posts = getPostsByIdAndUser(todoTask.id, todoTask.userId);

  if (!(posts && posts.value())) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(400, 'No such id/user present');
  }
  posts.
    assign({ taskStatus: todoTask.taskStatus.toUpperCase() }).
    write();

  return true;
};

exports.getAllTodos = () => db.get('posts').value();

exports.getFilteredTodo = (taskStatus, userId) => {
  if (taskStatus.toUpperCase() === 'ALL') {
    return this.getAllTodos();
  }

  return db.get('posts').filter({
    taskStatus: taskStatus.toUpperCase(),
    user: userId
  }).
    value();
};
