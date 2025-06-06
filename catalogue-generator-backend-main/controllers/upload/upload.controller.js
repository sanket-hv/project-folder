const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");

module.exports = {
    uploadImages: async (req, res) => {
        if (!req.files || req.files.length <= 0) {
            return response.BAD_REQUEST({ res, message: messages.IMAGES_ARE_REQUIRED });
        }

        const imagePaths = req.files.map((file) => file.path);

        return response.OK({ res, message: messages.IMAGES_UPLOADED_SUCCESSFULLY, payload: { imagePaths } });
    },
};
