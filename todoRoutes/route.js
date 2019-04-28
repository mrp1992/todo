/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
var todoController = require('../controller/todoListController');
var ServiceException = require('../exception/serviceException');

exports.addTodo = (app) => {
  // TodoList Routes
  app.post('/addTodo', (req, res) => {
    let response = null;

    try {
      this.paramBodyValidation(req.body.userId);
      this.paramBodyValidation(req.body.password);
      this.userValidation(req.body.userId, req.body.password);

      response = todoController.addTodo(req.body);
    } catch (execption) {
      res.status(execption.statusCode());
      response = this.erroRequest(
        execption.getMessage(),
        execption.statusCode()
      );
    }
    res.json(response);
  });

  app.post('/updateStatus', (req, res) => {
    // eslint-disable-next-line init-declarations
    let response;

    try {
      this.paramBodyValidation(req.body.userId);
      this.paramBodyValidation(req.body.password);
      this.userValidation(req.body.userId, req.body.password);

      response = todoController.updateStatus(req.body);
    } catch (exception) {
      response = this.erroRequest(
        exception.getMessage(),
        exception.statusCode()
      );
      res.status(exception.statusCode());
    }
    res.json(response);
  });

  app.get('/tasks', (req, res) => {
    let response = null;

    try {
      this.basicValidation(req);
      this.queryParamValidation(req.query);

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
};

exports.erroRequest = (errorMessage, statusCode) => {
  const response = {
    message: errorMessage,
    status: statusCode
  };

  return response;
};

exports.userValidation = (userId, password) => {
  // eslint-disable-next-line no-undef
  const buff = Buffer.from(password, 'base64');
  const decodedPassword = buff.toString('ascii');

  if (userId !== decodedPassword.split('').
    reverse().
    join('')) {
    throw new ServiceException(401, 'Invalid userId/password provided');
  }
};

exports.paramBodyValidation = (param) => {
  if (!param) {
    throw new ServiceException(400, 'param not provided');
  }
};

exports.queryParamValidation = (queryParam) => {
  if (!queryParam || !queryParam.taskStatus) {
    throw new ServiceException(400, 'Missing status');
  }
};

exports.basicValidation = (req) => {
  const userId = req.header('userId');
  const password = req.header('password');

  this.paramBodyValidation(userId);
  this.paramBodyValidation(password);
  this.userValidation(userId, password);
};

