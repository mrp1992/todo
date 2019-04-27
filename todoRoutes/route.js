/* eslint-disable consistent-return */
/* eslint-disable no-magic-numbers */
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

  app.get('/tasks', (req, res) => {
    let response = null;

    if (!req.query || !req.query.taskStatus) {
      response = {
        message: 'Missing status',
        status: 400
      };

      res.status(400);
      res.json(response);

      return res;
    }
    const status = req.query && req.query.taskStatus;

    response = todoController.fetchTodoTask(status);

    res.json(response);
  });

};
