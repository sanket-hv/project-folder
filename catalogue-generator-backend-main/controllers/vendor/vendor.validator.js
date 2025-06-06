const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    updateVendor: validate({
        body: Joi.object({
            name: Joi.string()
                .required()
                .pattern(/^[a-z0-9_]+$/) // Allows only lowercase letters and digits, no spaces or special characters
                .message("Username must be in lowercase and cannot contain spaces or special characters."),
            address: Joi.string().required(),
            mobileNo: Joi.string().required().max(10),

            paymentDetails: Joi.object({
                bankName: Joi.string().required().trim(),
                accountHolderName: Joi.string().required(),
                accountNumber: Joi.string().pattern(/^\d+$/).required(),
                accountType: Joi.string()
                    .valid("Saving", "Current", "Salary", "Other") // Allows only specific account types.
                    .required(),
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

        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteVendor: validate({
        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
