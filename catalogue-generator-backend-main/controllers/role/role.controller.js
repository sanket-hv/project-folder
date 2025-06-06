const DB = require("../../models");
const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");
const { createItem, getMultipleItems } = require("../../services/dbOperations.service");

module.exports = {
    createRole: async (req, res) => {
        try {
            // Create Role from the Admin side
            const createRole = await createItem(DB.role, { name: req.body.name });

            return response.CREATED({ res, message: messages.ROLE_CREATED_SUCCESSFULLY, payload: { createRole }, });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    getRole: async (req, res) => {
        try {
            const roleData = await getMultipleItems(DB.role, { ...req.query });

            return response.OK({
                res,
                message: messages.ROLE_FETCHED_SUCCESSFULLY,
                count: roleData.length,
                payload: { roleData },
            });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },
};
