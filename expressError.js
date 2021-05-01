class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.status = status;
        this.message = message;
        console.error(this.stack);
    }
}

class ResourceNotFoundError extends ExpressError {
    constructor(message="Resource Not Found") {
        super(message, 404);
    }
}

class RequestConflictError extends ExpressError {
    constructor(message="Request confilcts with existing data") {
        super(message, 409);
    }
}

class AuthenticationError extends ExpressError {
    constructor(message="username or password is incorrect") {
        super(message, 400);
    }
}

class UnauthorizedError extends ExpressError {
    constructor(message="Unauthorized") {
        super(message, 401);
    }
}

module.exports = { 
    ExpressError, 
    ResourceNotFoundError,
    RequestConflictError,
    AuthenticationError, 
    UnauthorizedError 
};