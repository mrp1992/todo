import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';
import ServiceException from '../../exception/serviceException';

const UNAUTHORIZED_TEXT = 'Invalid userId/password provided';
const MISSING_PARAMS = 'Missing parameters';
const INVALID_STATUS = 'Invalid status provided';
const MISSING_USER_ID_PASSWORD = 'userId/password missing';
const MISSING_STATUS = 'Missing status';

export const validStatus = (status) => {
    switch (status.toUpperCase()) {
        case 'ACTIVE': break;

        case 'COMPLETED': break;

        default: throw new ServiceException(BAD_REQUEST, INVALID_STATUS);
    }
};

export const userValidation = (userId, password) => {
    if (!(userId && password)) {
        throw new ServiceException(BAD_REQUEST, MISSING_USER_ID_PASSWORD);
    }
    // eslint-disable-next-line no-undef
    const buff = Buffer.from(password, 'base64');
    const decodedPassword = buff.toString('ascii');

    if (userId !== decodedPassword.split('').
        reverse().
        join('')) {
        throw new ServiceException(UNAUTHORIZED, UNAUTHORIZED_TEXT);
    }
};

export const queryParamValidation = (queryParam) => {
    if (!queryParam || !queryParam.taskStatus) {
        throw new ServiceException(BAD_REQUEST, MISSING_STATUS);
    }
};

export const validateFetchTask = (req) => {
    const userId = req.header('userId');
    const password = req.header('password');

    userValidation(userId, password);
    queryParamValidation(req.query);
};

export const validateAddTodo = (body) => {
    const { taskName, taskStatus } = body;

    if (!(taskName && taskStatus)) {
        throw new ServiceException(BAD_REQUEST, MISSING_PARAMS);
    }

    validStatus(taskStatus);
};

export const validateRemoveTodo = (body) => {
    const { id, taskName, userId, password } = body;

    userValidation(userId, password);

    if (!(id, taskName)) {
        throw new ServiceException(BAD_REQUEST, MISSING_PARAMS);
    }
};
