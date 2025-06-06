const messages = require("../json/message.json");
const { HTTP_CODES } = require("../json/enums.json");

const response = {
    OK({ res, message = messages.OK, count, payload = {} } = {}) {
        res.status(HTTP_CODES.OK).json({
            success: true,
            message,
            count,
            payload,
        });
    },

    CREATED({ res, message = messages.CREATED, payload = {} } = {}) {
        res.status(HTTP_CODES.CREATED).json({
            success: true,
            message,
            payload,
        });
    },

    ALL_REQUIRED({ res, message = messages.ALL_REQUIRED, payload = {} } = {}) {
        res.status(HTTP_CODES.ALL_REQUIRED).json({
            success: false,
            message,
            payload,
        });
    },

    NOT_FOUND({ res, message = messages.NOT_FOUND } = {}) {
        res.status(HTTP_CODES.NOT_FOUND).json({
            success: false,
            message,
        });
    },

    UNAUTHORIZED({ res, message = messages.UNAUTHORIZED } = {}) {
        res.status(HTTP_CODES.UNAUTHORIZED).json({
            success: false,
            message,
        }); 
    },

    EXISTED({ res, message = messages.EXISTED } = {}) {
        res.status(HTTP_CODES.EXISTED).json({
            success: false,
            message,
        });
    },

    BAD_REQUEST({ res, message = messages.BAD_REQUEST } = {}) {
        res.status(HTTP_CODES.BAD_REQUEST).json({
            success: false,
            message,
        });
    },

    INTERNAL_SERVER_ERROR({ res, message = messages.INTERNAL_SERVER_ERROR } = {}) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message,
        });
    },

    NO_ENOUGH_STOCK({ res, message = messages.NO_ENOUGH_STOCK } = {}) {
        res.status(HTTP_CODES.NO_ENOUGH_STOCK).json({
            success: false,
            message,
        });
    },

    TOKEN_EXPIRED({ res, err } = {}) {
        res.status(HTTP_CODES.UNAUTHORIZED).json({
            success: false,
            message: err.message,
            expiredAt: err.expiredAt,
        });
    },

    TOKEN_ERROR({ res, err } = {}) {
        res.status(HTTP_CODES.UNAUTHORIZED).json({
            success: false,
            message: err.message,
        });
    },
};

module.exports = response;
