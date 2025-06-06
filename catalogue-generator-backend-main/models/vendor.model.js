const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        mobileNo: {
            type: Number,
            required: true,
        },

        subDomain: {
            type: String,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        paymentDetails: {
            type: Object,
            bankName: {
                type: String,
                required: true,
                trim: true,
            },
            accountHolderName: {
                type: String,
                required: true,
            },
            accountNumber: {
                type: String,
                required: true,
            },
            accoutType: {
                type: String,
                required: true,
            },
        },

        businessDetails: {
            type: Object,
            companyName: {
                type: String,
                required: true,
            },
            gstAddress: {
                type: String,
                required: true,
            },
            gstNo: {
                type: String,
                required: true,
            },
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("vendor", schema, "vendor");
