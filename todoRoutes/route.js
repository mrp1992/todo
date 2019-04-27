var todoController = require('../controller/todoListController');

exports.addTodo = (app) => {
  // TodoList Routes
  app.post('/addTodo', (req, res) => {
    var data = todoController.addTodo(req.body);

    res.json(data);
  });

  app.post('/updateStatus', (req, res) => {
    // eslint-disable-next-line init-declarations
    let response;

    try {
      response = todoController.updateStatus(req.body);
      // eslint-disable-next-line id-length
    } catch (e) {
      response = {
        errorMessage: e.getMessage(),
        status: e.statusCode()
      };

      res.status(e.statusCode());
    }

    res.json(response);
  });

};
