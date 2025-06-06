const { Schema, model, default: mongoose } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        friendlyURL: {
            type: String,
            required: true,
        },
        categoryImages: {
            type: [String],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        view: {
            type: Number,
            default: 0,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "category",
            default: null,
        },
        vendorId: {
            type: Schema.Types.ObjectId,
            ref: "vendor",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("category", schema, "category");
