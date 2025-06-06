const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createCategory: validate({
        body: Joi.object({
            name: Joi.string().required(),
            categoryName: Joi.string().allow(""),
            parentId: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId"),
            // categoryImages: Joi.array().items(Joi.string()).required().min(1),
        }),
    }),

    updateCategory: validate({
        body: Joi.object({
            name: Joi.string().required(),
            categoryName: Joi.string().allow(""),
            categoryImages: Joi.array().items(Joi.string()).required().min(1),
        }),

        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteCategory: validate({
        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
