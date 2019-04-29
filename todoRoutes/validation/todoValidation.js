/* eslint-disable no-magic-numbers */
var ServiceException = require('../../exception/serviceException');

exports.userValidation = (userId, password) => {
    if (!(userId && password)) {
        throw new ServiceException(400, 'userId/password missing');
    }
    // eslint-disable-next-line no-undef
    const buff = Buffer.from(password, 'base64');
    const decodedPassword = buff.toString('ascii');

    if (userId !== decodedPassword.split('').
        reverse().
        join('')) {
        throw new ServiceException(401, 'Invalid userId/password provided');
    }
};

exports.queryParamValidation = (queryParam) => {
    if (!queryParam || !queryParam.taskStatus) {
        throw new ServiceException(400, 'Missing status');
    }
};

exports.validateFetchTask = (req) => {
    const userId = req.header('userId');
    const password = req.header('password');

    this.userValidation(userId, password);
    this.queryParamValidation(req.query);
};

exports.validateAddTodo = (body) => {
    const { taskName, taskStatus } = body;

    if (!(taskName && taskStatus)) {
        throw new ServiceException(400, 'Missing parameters');
    }

    this.validStatus(taskStatus);
};

exports.validateRemoveTodo = (body) => {
    const { id, taskName, userId, password } = body;

    this.userValidation(userId, password);

    if (!(id, taskName)) {
        throw new ServiceException(400, 'Missing parameters');
    }
};

exports.validStatus = (status) => {
    switch (status.toUpperCase()) {
        case 'ACTIVE': break;

        case 'COMPLETED': break;

        default: throw new ServiceException(400, 'Invalid status provided');
    }
};
