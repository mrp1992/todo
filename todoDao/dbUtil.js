var db = require('./db');
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
      taskStatus: todoTask.taskStatus.toUpperCase(),
      user: todoTask.userId
    }).
    write();

  return true;
};

exports.updateTodoStatus = (todoTask) => {
  const posts = db.get('posts').find({
    id: todoTask.id,
    user: todoTask.userId
  });

  if (!posts.value()) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(400, 'No such id/user present');
  }
  posts.
    assign({ taskStatus: todoTask.taskStatus.toUpperCase() }).
    write();
  todoId = totalTodos && totalTodos.length +1;
  console.log(db.get('posts'));
  db.get('posts')
    .push({ id: todoId,
      taskName: todoTask.taskName,
      taskStatus: todoTask.taskStatus
    })
    .write();

  return true;
};

exports.getAllTodo = () => db.get('posts').value();

exports.getFilteredTodo = (taskStatus, userId) => {
  if (taskStatus.toUpperCase() === 'ALL') {
    return this.getAllTodo();
  }

  return db.get('posts').filter({
    taskStatus: taskStatus.toUpperCase(),
    user: userId
  }).
    value();
};
