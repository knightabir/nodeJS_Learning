class ApiError extends Error {
    /**
     * Class representing an API error.
     * @constructor
     * @param {number} statusCode - The status code of the error.
     * @param {string} [message="Some Error Occurred"] - The error message.
     * @param {Array} [errors=[]] - The list of error details.
     */
    constructor(
        statusCode,
        message = "Some Error Occurred",
        errors = []
    ) {
        // Call the parent class constructor
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.success = false;

        // Set the error stack trace if provided, otherwise capture it
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}