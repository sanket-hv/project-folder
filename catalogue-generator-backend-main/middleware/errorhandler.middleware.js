const { ValidationError } = require("express-validation");

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        // Body error handle
        if (err.details.body) {
            const errorDetails = err.details.body.map((detail) => ({
                field: detail.context.key,
                message: detail.message.replace(/\\/g, "").replace(/\"/g, ""),
            }));

            return res.status(err.statusCode).json({
                status: "false",
                errors: errorDetails[0],
            });
        }

        // Params error handle
        else if (err.details.params) {
            const errorDetails = err.details.params.map((detail) => ({
                field: detail.context.key,
                message: detail.message.replace(/\\/g, "").replace(/\"/g, ""),
            }));

            return res.status(err.statusCode).json({
                status: "false",
                errors: errorDetails[0],
            });
        }

        // Query error handle
        else if (err.details.query) {
            const errorDetails = err.details.query.map((detail) => ({
                field: detail.context.key,
                message: detail.message.replace(/\\/g, "").replace(/\"/g, ""),
            }));

            return res.status(err.statusCode).json({
                status: "false",
                errors: errorDetails[0],
            });
        }
    }

    return next(err);
};

module.exports = errorHandler;
