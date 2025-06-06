const DB = require("../../models");
const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");
const { getSingleItem } = require("../../services/dbOperations.service");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../../json/enums.json");

module.exports = {
    /* Get inquiry data API*/
    getInquiry: async (req, res) => {
        try {
            let { ...query } = req.query;

            if (req.user.role !== ADMIN) {
                const vendor = await getSingleItem(DB.vendor, { _id: req.params._id });
                if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

                query.vendorId = vendor._id;
            }

            const inquiries = await DB.inquiry.find(query).select("-createdAt -updatedAt -vendorId");

            return response.OK({ res, message: messages.INQUIRIES_FETCHED_SUCCESSFULLY, count: inquiries.length, payload: { inquiries }, });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    /* Create inquiry data API */
    createInquiry: async (req, res) => {
        try {

            const vendor = await getSingleItem(DB.vendor, { _id: req.params._id });
            if (!vendor) return response.NOT_FOUND({ res, message: messages.VENDOR_NOT_FOUND });

            req.body.vendorId = vendor._id;
            const inquiryData = await DB.inquiry.create(req.body);

            return response.CREATED({ res, message: messages.INQUIRY_CREATED_SUCCESSFULLY, payload: { inquiryData } });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },
};
