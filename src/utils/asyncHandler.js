/**
 * Wraps the request handler function with an asyncHandler function.
 * This function ensures that any errors thrown by the request handler
 * are caught and passed to the next middleware function in the chain.
 *
 * @param {function} requestHandler - The request handler function to be wrapped.
 * @return {function} The wrapped request handler function.
 */
const asyncHandler = (requestHandler) => {
    /**
     * The wrapped request handler function.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {function} next - The next middleware function.
     */
    return (req, res, next) => {
        // Wrap the request handler function with a promise and catch any errors.
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export {asyncHandler}