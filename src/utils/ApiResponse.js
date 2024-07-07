class ApiResponse {
    /**
     * Class representing an API response.
     * @constructor
     * @param {number} statusCode - The status code of the response.
     * @param {boolean} success - Indicates if the request was successful.
     * @param {string} [message="Success"] - The message of the response.
     * @param {object} data - The data of the response.
     */
    constructor(statusCode, success, message = "Success", data) {
        /**
         * The status code of the response.
         * @type {number}
         */
        this.statusCode = statusCode;

        /**
         * Indicates if the request was successful.
         * @type {boolean}
         */
        this.success = success;

        /**
         * The message of the response.
         * @type {string}
         */
        this.message = message;

        /**
         * The data of the response.
         * @type {object}
         */
        this.data = data;
    }
}