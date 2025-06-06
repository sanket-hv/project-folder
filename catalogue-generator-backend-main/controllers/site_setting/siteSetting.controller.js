const DB = require("../../models");
const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");
const { getSingleItem } = require("../../services/dbOperations.service");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../../json/enums.json");

module.exports = {
    /* Get vendor site setting API */
    getSetting: async (req, res) => {
        try {
            //     //TODO: (subDomain: subdomain) // const subdomain = req.subdomains[0];
            let { ...query } = req.query;

            if (req.user.role !== ADMIN) {
                const vendor = await getSingleItem(DB.vendor, { _id: req.params._id });
                if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

                query.vendorId = vendor._id;
            }

            const siteSettings = await DB.siteSetting.find(query).select("-createdAt -updatedAt").populate("vendorId", "name");

            return response.OK({
                res, message: messages.SITESETTINGS_FETCHED_SUCCESSFULLY, payload: { siteSettings },
            });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Create vendor site setting API */
    createSetting: async (req, res) => {
        try {

            if (req.user.role !== ADMIN) {
                const vendor = await getSingleItem(DB.vendor, { userId: req.user._id });
                if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

                req.body.vendorId = vendor._id;
            }
            if (await getSingleItem(DB.siteSetting, { vendorId: req.body.vendorId })) return response.EXISTED({ res, message: messages.SITESETTINGS_ALREADY_EXISTS })

            const createSetting = await DB.siteSetting.create(req.body)

            return response.CREATED({ res, message: messages.SITESETTINGS_CREATED_SUCCESSFULLY, payload: { createSetting } });

        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Update vendor site setting API */
    updateSetting: async (req, res) => {
        try {
            const vendor = await getSingleItem(DB.vendor, { _id: req.params._id });
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

            const siteSetting = await getSingleItem(DB.siteSetting, { vendorId: vendor._id });
            if (!siteSetting) return response.NOT_FOUND({ res, message: messages.SITESETTINGS_NOT_FOUND });

            await DB.siteSetting.findByIdAndUpdate({ _id: siteSetting._id }, req.body, { new: true })

            return response.OK({ res, message: messages.SITESETTINGS_UPDATED_SUCCESSFULLY, });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Delete vendor site setting API */
    deleteSetting: async (req, res) => {
        try {

            const vendor = await getSingleItem(DB.vendor, { _id: req.params._id });
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

            const siteSetting = await getSingleItem(DB.siteSetting, { vendorId: vendor._id });
            if (!siteSetting) return response.NOT_FOUND({ res, message: messages.SITESETTINGS_NOT_FOUND });

            await DB.siteSetting.findByIdAndDelete({ _id: siteSetting._id, vendorId: vendor._id })

            return response.OK({ res, message: messages.SITESETTINGS_DELETED_SUCCESSFULLY });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
