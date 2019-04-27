const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./dataStore/db.json');
const db = low(adapter);

var todoId = 0;

db.defaults({ posts: [] }).write();

exports.pushToDb = (todoTask) => {
  const totalTodos = this.getAllTodo();

  // eslint-disable-next-line no-magic-numbers
  todoId = totalTodos && totalTodos.length + 1;
db.get('posts').
push({ id: todoId,
    taskName: todoTask.taskName,
    taskStatus: todoTask.taskStatus }).
    write();

  return true;
};

exports.getAllTodo = () => db.get('posts').value();
