import multer from "multer";

const storage = multer.diskStorage({
    /**
     * Sets the destination folder for storing uploaded files.
     *
     * @param {Object} req - The request object
     * @param {Object} file - The file being uploaded
     * @param {Function} cb - The callback function
     */
    destination: function (req, file, cb) {
        cb(null, "/public/temp");
    },
    /**
     * Sets the filename for the uploaded file.
     *
     * @param {Object} req - The request object
     * @param {Object} file - The file being uploaded
     * @param {Function} cb - The callback function
     */
    filename: function (req, file, cb) {
        // Generate a unique suffix for the filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        // Set the filename to be the fieldname followed by the unique suffix
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });