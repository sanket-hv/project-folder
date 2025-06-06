const response = require("../helper/response.helper");
const messages = require("../json/message.json");
const jwt = require("jsonwebtoken");
const DB = require("../models");
const {
    USER_TYPE: { ADMIN, CUSTOMER },
} = require("../json/enums.json");

module.exports = {
        auth: ({ isTokenRequired = true, usersAllowed = [] } = {}) => {
        return async (req, res, next) => {
            let user;
            try {
                // Get the token from the headers
                const token = req.headers.authtoken;

                // Conditions for token
                if (isTokenRequired && !token) return response.UNAUTHORIZED({ res, message: messages.TOKEN_REQUIRED });
                if (!isTokenRequired && !token) {
                    req.user = { role: CUSTOMER };
                    return next();
                }

                // Verify JWT token
                const decoded = jwt.verify(token, process.env.SECRET_KEY);

                user = await DB.user.findOne({ _id: decoded.id });
                if (!user) return response.NOT_FOUND({ res, message: messages.USER_NOT_FOUND });

                req.token = token;
            } catch (err) {
                if (err.name === "TokenExpiredError") return response.TOKEN_EXPIRED({ res, err });
                else if (err.name === "JsonWebTokenError") return response.TOKEN_ERROR({ res, err });
                else {
                    console.error(err);
                    return response.INTERNAL_SERVER_ERROR({ res });
                }
            }
            req.user = user;

            if (usersAllowed.length) {
                if (req.user.role === ADMIN) return next();
                if (usersAllowed.includes("*")) return next();
                if (usersAllowed.includes(req.user.role)) return next();

                return response.UNAUTHORIZED({ res });
            } else {
                if (req.user.role === ADMIN) return next();
                return response.UNAUTHORIZED({ res });
            }
        };
    },
};
