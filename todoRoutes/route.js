import * as controller from '../controller/todoListController';
import * as validation from './validation/todoValidation';
import { NO_CONTENT, OK } from 'http-status-codes';

export const errorRequest = (errorMessage, statusCode) => ({
  message: errorMessage,
  status: statusCode
});

export const todo = (app) => {
  // TodoList Routes
  app.put('/addTodo', (req, res) => {
    try {
      validation.userValidation(req.body.userId, req.body.password);
      validation.validateAddTodo(req.body);

      controller.addTodo(req.body);

      res.sendStatus(NO_CONTENT);
    } catch (exception) {
      res.status(exception.status);
       res.json(errorRequest(
        exception.message,
        exception.status
      ));
    }
  });

  app.post('/updateStatus', (req, res) => {
    try {
      validation.userValidation(req.body.userId, req.body.password);

      controller.updateStatus(req.body);
      res.sendStatus(OK);
    } catch (exception) {
      res.status(exception.status);
      res.json(errorRequest(
          exception.message,
          exception.status
      ));
    }
  });

  app.get('/tasks', (req, res) => {
    let response = null;

    try {
      validation.validateFetchTask(req);

      const status = req.query.taskStatus;

      response = controller.fetchTodoTask(status, req.header('userId'));
    } catch (exception) {
      res.status(exception.status);
      res.json(errorRequest(
          exception.message,
          exception.status
      ));
    }
    res.json(response);
  });

  app.delete('/removeTodo', (req, res) => {
    let response = null;

    try {
      validation.validateRemoveTodo(req.body);

      response = controller.removeTodo(req.body);
    } catch (exception) {
      res.status(exception.status);
      res.json(errorRequest(
          exception.message,
          exception.status
      ));
    }
    res.json(response);
  });
};