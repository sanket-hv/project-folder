const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const DB = require("../../models");
const response = require("../../helper/response.helper");
const messages = require("../../json/message.json");
const { getSingleItem } = require("../../services/dbOperations.service");
const { USER_TYPE: { VENDOR, ADMIN }, } = require("../../json/enums.json");

module.exports = {
    createUser: async (req, res) => {
        try {
            // Create Vendor & User
            const { username, password, address, mobileNo, paymentDetails, businessDetails } = req.body;

            const existingUser = await getSingleItem(DB.user, { username });
            if (existingUser) return response.EXISTED({ res, message: messages.USER_ALREADY_EXISTS });

            req.body.password = await bcrypt.hash(password, 10);

            const userCreate = await DB.user.create({ username, password: req.body.password, role: VENDOR })

            const vendor = await DB.vendor.create({ name: username, address, mobileNo, subDomain: username, paymentDetails, businessDetails, userId: userCreate._id })

            await DB.siteSetting.create({
                phone: mobileNo,
                address,
                logo: ["https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"],
                whatsapp: "",
                color: "#FFFFFF",
                facebook: "www.facebook.com",
                linkedin: "www.linkedin.com",
                instagram: "www.instagram.com",
                twitter: "www.twitter.com",
                youtube: "www.youtube.com",
                pinterest: "www.pinterest.com",
                googleBusiness: "",
                mainWeb: "",
                vendorId: vendor._id,
            })
            // return response
            return response.OK({ res, message: messages.USER_CREATED_SUCCESSFULLY });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res, message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            // Login existing User
            const { username, password } = req.body;

            const user = await getSingleItem(DB.user, { username });
            if (!user) return response.NOT_FOUND({ res, message: messages.USER_NOT_FOUND });

            const ismatch = await bcrypt.compare(password, user.password);
            if (!ismatch) return response.UNAUTHORIZED({ res });

            const id = user._id;
            const name = user.username;
            const role = user.role;

            const token = jwt.sign({ id, name, role }, process.env.SECRET_KEY, { expiresIn: "365d" });
            if (user.role === ADMIN) {
                return response.OK({ res, message: messages.USER_LOGIN_SUCCESSFULLY, payload: { id, name, role, token }, });
            }

            return response.OK({
                res,
                message: messages.USER_LOGIN_SUCCESSFULLY,
                payload: { id, name, role, token, vendorId: (await DB.vendor.findOne({ userId: user._id }))._id },
            });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
