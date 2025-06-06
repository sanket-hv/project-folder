const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createProduct: validate({
        body: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            productImages: Joi.array().items(Joi.string()).required().min(1),
            shortDescription: Joi.string(),
            longDescription: Joi.string(),
            categoryId: Joi.string().allow(""),
        }),
    }),

    updateProduct: validate({
        body: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            productImages: Joi.array().items(Joi.string()).required().min(1),
            shortDescription: Joi.string(),
            longDescription: Joi.string(),
            categoryId: Joi.string().allow(""),
        }),

        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteProduct: validate({
        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
