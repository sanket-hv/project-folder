const DB = require("../../models");
const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../../json/enums.json");
const { getSingleItem } = require("../../services/dbOperations.service");

module.exports = {
    /* Get vendor API */
    getVendor: async (req, res) => {
        try {
            let { ...query } = req.query;

            if (req.user.role !== ADMIN) {
                const vendor = await getSingleItem(DB.vendor, { _id: req.params._id });
                if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

                query._id = vendor._id;
            }

            const vendorData = await DB.vendor.findOne(query).select("-createdAt -updatedAt");

            return response.OK({ res, message: messages.VENDOR_FETCHED_SUCCESSFULLY, count: vendorData.length, payload: { vendorData }, });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Update vendor API */
    updateVendor: async (req, res) => {
        try {
            //TODO: (subDomain: req.subdomains)

            const vendor = await getSingleItem(DB.vendor, { _id: req.params._id })
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND })

            if (await DB.user.findOne({ _id: { $ne: vendor.userId }, username: req.body.name, })) return response.BAD_REQUEST({ res, message: messages.USERNAME_ALREADY_EXISTS })

            const vendorUpdate = await DB.vendor.findByIdAndUpdate({ _id: vendor._id }, req.body, { new: true })
            if (!vendorUpdate) return response.BAD_REQUEST({ res, message: messages.VENDOR_NOT_UPDATED })
            await DB.user.findByIdAndUpdate({ _id: vendor.userId }, { username: req.body.name }, { new: true })

            return response.OK({ res, message: messages.VENDOR_UPDATED_SUCCESSFULLY, payload: { vendorUpdate } });

        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Delete vendor API */
    deleteVendor: async (req, res) => {
        try {
            //TODO: (subDomain: req.subdomains)

            const vendor = await getSingleItem(DB.vendor, { _id: req.params._id })
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND })

            await DB.vendor.findByIdAndDelete(req.params._id)
            await DB.user.findByIdAndUpdate({ _id: vendor.userId }, { isActive: false }, { new: true })
            return response.OK({ res, message: messages.VENDOR_DELETED_SUCCESSFULLY });

        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },
};
