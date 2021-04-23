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

module.exports = { 
    ExpressError, 
    ResourceNotFoundError 
};