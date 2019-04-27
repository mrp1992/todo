module.exports = function(app) {
  var todoList = require('../controller/todoListController');

  // todoList Routes
  app.post("/addTodo", function (req, res) {
    var data = todoList.addTodo(req.body);
    res.json(data);
  });

}
