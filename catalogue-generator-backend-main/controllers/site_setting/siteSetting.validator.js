const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createSetting: validate({
        body: Joi.object({
            phone: Joi.string().required().max(10),
            address: Joi.string().required(),
            logo: Joi.array().items(Joi.string()),
            color: Joi.string().default("#FFFFFF"),
            whatsapp: Joi.string().default(null),
            facebook: Joi.string().default(null),
            linkedin: Joi.string().default(null),
            instagram: Joi.string().default(null),
            twitter: Joi.string().default(null),
            youtube: Joi.string().default(null),
            pinterest: Joi.string().default(null),
            googleBusiness: Joi.string().default(null),
            mainWeb: Joi.string().default(null),
        }),
    }),

    updateSetting: validate({
        body: Joi.object({
            color: Joi.string().default("#FFFFFF"),
            logo: Joi.array().items(Joi.string()),
            facebook: Joi.string().allow(""),
            linkedin: Joi.string().allow(""),
            instagram: Joi.string().allow(""),
            twitter: Joi.string().allow(""),
            whatsapp: Joi.string().allow(""),
            youtube: Joi.string().allow(""),
            pinterest: Joi.string().allow(""),
            googleBusiness: Joi.string().allow(""),
            address: Joi.string().required(),
            phone: Joi.string().required().max(10),
            mainWeb: Joi.string().allow(""),
        }),
        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteSetting: validate({
        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
