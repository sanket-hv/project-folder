const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createUser: validate({
        body: Joi.object({
            username: Joi.string()
                .required()
                .pattern(/^[a-z0-9_-]+$/) // Allows lowercase letters, digits, underscores, and hyphens
                .message("Username must be in lowercase and can only contain letters, digits, underscores, or hyphens."),
            password: Joi.string().required(),
            address: Joi.string().required(),
            mobileNo: Joi.string().required().max(10),

            paymentDetails: Joi.object({
                bankName: Joi.string().required().trim(),
                accountHolderName: Joi.string().required(),
                accountNumber: Joi.string().pattern(/^\d+$/).required(),
                accoutType: Joi.string().valid("Saving", "Current", "Salary", "Other").required(),
            }),

            businessDetails: Joi.object({
                companyName: Joi.string().required(),
                gstAddress: Joi.string().required(),
                gstNo: Joi.string()
                    .required()
                    .pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/)
                    .message("Please, Enter valid GST no."), // Ex. 22 AAAAA 0000 A 1Z5
            }),
        }),
    }),

    loginUser: validate({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
};
