const router = require("express").Router();

const { auth } = require("../middleware/auth.middleware");
const { INQUIRY: { APIS, VALIDATOR }, } = require("../controllers");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../json/enums.json");

/* Get Apis */
router.get("/:_id?", auth({ usersAllowed: [ADMIN, VENDOR] }), APIS.getInquiry);

/* Post Apis */
router.post("/:_id", auth({ isTokenRequired: false, usersAllowed: ["*"] }), VALIDATOR.createInquiry, APIS.createInquiry);

module.exports = router;
