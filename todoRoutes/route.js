/* eslint-disable max-lines-per-function */
const todoController = require('../controller/todoListController');
const validate = require('./validation/todoValidation');
const { NO_CONTENT, OK } = require('http-status-codes');

exports.addTodo = (app) => {
  // TodoList Routes
  app.put('/addTodo', (req, res) => {
    try {
      validate.userValidation(req.body.userId, req.body.password);
      validate.validateAddTodo(req.body);

      todoController.addTodo(req.body);

      res.sendStatus(NO_CONTENT);
    } catch (exception) {
      res.status(exception.getStatus());
       res.json(this.erroRequest(
        exception.getMessage(),
        exception.getStatus()
      ));
    }
  });

  app.post('/updateStatus', (req, res) => {
    try {
      validate.userValidation(req.body.userId, req.body.password);

      todoController.updateStatus(req.body);
      res.sendStatus(OK);
    } catch (exception) {
      res.status(exception.getStatus());
      res.json(this.erroRequest(
        exception.getMessage(),
        exception.getStatus()
      ));
    }
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

  app.delete('/removeTodo', (req, res) => {
    let response = null;

    try {
      validate.validateRemoveTodo(req.body);

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
