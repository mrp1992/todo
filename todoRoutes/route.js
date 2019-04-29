/* eslint-disable max-lines-per-function */
const todoController = require('../controller/todoListController');
const validate = require('./validation/todoValidation');

exports.addTodo = (app) => {
  // TodoList Routes
  app.post('/addTodo', (req, res) => {
    let response = null;

    try {
      validate.userValidation(req.body.userId, req.body.password);
      validate.validateAddTodo(req.body);

      response = todoController.addTodo(req.body);
    } catch (exception) {
      res.status(exception.getStatus());
      response = this.erroRequest(
        exception.getMessage(),
        exception.statusCode()
      );
    }
    res.json(response);
  });

  app.post('/updateStatus', (req, res) => {
    // eslint-disable-next-line init-declarations
    let response;

    try {
      validate.userValidation(req.body.userId, req.body.password);

      response = todoController.updateStatus(req.body);
    } catch (exception) {
      response = this.erroRequest(
        exception.getMessage(),
        exception.getStatus()
      );
      res.status(exception.getStatus());
    }
    res.json(response);
  });

  app.get('/tasks', (req, res) => {
    let response = null;

    try {
      validate.validateFetchTask(req);

      const status = req.query.taskStatus;

      response = todoController.fetchTodoTask(status, req.header('userId'));
    } catch (exception) {
      res.status = exception.statusCode();
      response = this.erroRequest(
        exception.getMessage(),
        exception.statusCode()
      );
    }
    res.json(response);
  });

  app.post('/removeTodo', (req, res) => {
    let response = null;

    try {
      validate.userValidation(req.body.userId, req.body.password);

      response = todoController.removeTodo(req.body);
    } catch (exception) {
      response = this.erroRequest(
        exception.getMessage(),
        exception.getStatus()
      );
      res.status(exception.getStatus());
    }
    res.json(response);
  });
};

exports.erroRequest = (errorMessage, statusCode) => {
  const response = {
    message: errorMessage,
    status: statusCode
  };

  return response;
};
