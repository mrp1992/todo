/* eslint-disable no-magic-numbers */
const { db } = require('./db');
const ServiceException = require('../exception/serviceException');

let todoId = 0;

db.defaults({ posts: [] }).write();

const getPostByTaskAndUser = (taskName, user) => db.get('posts').find({
  taskName,
  user
});

exports.pushToDb = (todoTask) => {
  const posts = getPostByTaskAndUser(todoTask.taskName, todoTask.userId);

  if (posts && posts.value()) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(400, 'task already present');
  }
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
};

exports.updateTodoStatus = (todoTask) => {
  const posts = getPostByTaskAndUser(todoTask.taskName, todoTask.userId);

  if (!(posts && posts.value())) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(400, 'No such task present');
  }
  posts.
    assign({ taskStatus: todoTask.taskStatus.toUpperCase() }).
    write();
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

exports.removeTodo = (removeTask) => {
  const { id, userId, taskName } = removeTask;
  const posts = db.get('posts').find({
    id,
    taskName,
    user: userId
  });

  if (!(posts && posts.value())) {
    throw new ServiceException(400, 'No such id/user present');
  }

  db.get('posts').
  remove({
    id,
    taskName,
    user: userId
  }).
  write();

  return true;
};
