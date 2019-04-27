var todoList = require('../controller/todoListController');

exports.addTodo = (app) => {
  // TodoList Routes
  app.post('/addTodo', (req, res) => {
    var data = todoList.addTodo(req.body);

    res.json(data);
  });

};
