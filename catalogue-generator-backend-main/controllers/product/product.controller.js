const DB = require("../../models");
const messages = require("../../json/message.json");
const response = require("../../helper/response.helper");
const { getSingleItem } = require("../../services/dbOperations.service");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../../json/enums.json");

module.exports = {
    /* Get product API */
    getProducts: async (req, res) => {
        try {
            let { ...query } = req.query;

            if (req.user.role !== ADMIN) {
                const vendor = await getSingleItem(DB.vendor, { _id: req.params.vendorId });
                if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

                query.vendorId = vendor._id;
            }

            if (req.params.productId) query._id = req.params.productId

            const products = await DB.product.find(query)
                .populate("categoryId", "name friendlyURL categoryImages parentId view")
                .select("-createdAt -updatedAt -vendorId")

            // Return fetched data response
            return response.OK({
                res,
                message: messages.PRODUCTS_FETCHED_SUCCESSFULLY,
                count: products.length,
                payload: { products },
            });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Create product API */
    createProduct: async (req, res) => {
        try {

            const vendor = await getSingleItem(DB.vendor, { userId: req.user._id })
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND })
            req.body.vendorId = vendor._id

            req.body.friendlyURL = req.body.name.toString().trim().toLowerCase().split(" ").join("-");

            if (await getSingleItem(DB.product, { vendorId: vendor._id, friendlyURL: req.body.friendlyURL })) return response.EXISTED({ res, message: messages.PRODUCT_NAME_ALREADY_EXISTS })

            if (req.body.categoryId) {
                if (!(await DB.category.findOne({ vendorId: vendor._id, _id: req.body.categoryId }))) return response.NOT_FOUND({ res, message: messages.CATEGORY_NOT_FOUND_NOT_FOUND })
            } else req.body.categoryId = null

            await DB.product.create(req.body)
            return response.CREATED({ res, message: messages.PRODUCT_CREATED_SUCCESSFULLY, payload: req.body })

        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Update product API */
    updateProduct: async (req, res) => {
        try {

            const vendor = await getSingleItem(DB.vendor, { userId: req.user._id })
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND })
            req.body.vendorId = vendor._id

            req.body.friendlyURL = req.body.name.toString().trim().toLowerCase().split(" ").join("-");

            if (await getSingleItem(DB.product, { _id: { $ne: req.params._id }, vendorId: vendor._id, friendlyURL: req.body.friendlyURL })) return response.EXISTED({ res, message: messages.PRODUCT_NAME_ALREADY_EXISTS })

            if (req.body.categoryId) {
                if (!(await DB.category.findOne({ vendorId: vendor._id, _id: req.body.categoryId }))) return response.NOT_FOUND({ res, message: messages.CATEGORY_NOT_FOUND })
            } else req.body.categoryId = null

            await DB.product.findByIdAndUpdate(req.params._id, req.body, { new: true })
            return response.OK({ res, message: messages.PRODUCT_UPDATED_SUCCESSFULLY })

        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Delete product API */
    deleteProduct: async (req, res) => {
        try {

            if (!(await getSingleItem(DB.product, { _id: req.params._id }))) return response.NOT_FOUND({ res, message: messages.PRODUCT_NOT_FOUND_NOT_FOUND })

            await DB.product.findByIdAndDelete(req.params._id)
            return response.OK({ res, message: messages.PRODUCT_DELETED_SUCCESSFULLY })

        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },
};
