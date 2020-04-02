import { BAD_REQUEST } from 'http-status-codes';
import ServiceException from '../exception/serviceException';
import { db } from './db';

let todoId = 0;

db.defaults({ posts: [] }).write();

const getPostByTaskAndUser = (taskName, user) => db.get('posts').find({
  taskName,
  user
});

export const getAllTodos = () => db.get('posts').value();

export const pushToDb = (todoTask) => {
  const posts = getPostByTaskAndUser(todoTask.taskName, todoTask.userId);

  if (posts && posts.value()) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(BAD_REQUEST, 'task already present');
  }
  const totalTodos = getAllTodos();

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

export const updateTodoStatus = (todoTask) => {
  const posts = getPostByTaskAndUser(todoTask.taskName, todoTask.userId);

  if (!(posts && posts.value())) {
    // eslint-disable-next-line no-magic-numbers
    throw new ServiceException(BAD_REQUEST, 'No such task present');
  }
  posts.
    assign({ taskStatus: todoTask.taskStatus.toUpperCase() }).
    write();
};

export const getFilteredTodo = (taskStatus, userId) => {
  if (taskStatus.toUpperCase() === 'ALL') {
    return getAllTodos();
  }

  return db.get('posts').filter({
    taskStatus: taskStatus.toUpperCase(),
    user: userId
  }).
    value();
};

export const removeTodo = (removeTask) => {
  const { id, userId, taskName } = removeTask;
  const posts = db.get('posts').find({
    id,
    taskName,
    user: userId
  });

  if (!(posts && posts.value())) {
    throw new ServiceException(BAD_REQUEST, 'No such id/user present');
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
