class ServiceException extends Error {
    constructor (errorCode, message) {
        super(message);

        this.status = errorCode;
        this.message = message;
    }

    getStatus () {
        return this.status;
    }

    getMessage () {
        return this.message;
    }
}

module.exports = ServiceException;
