const router = require("express").Router();

const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../json/enums.json");
const { SITE_SETTING: { APIS, VALIDATOR }, } = require("../controllers");

/* Get Apis */
router.get("/:_id?", auth({ isTokenRequired: false, usersAllowed: ["*"] }), APIS.getSetting);

/* Post Apis */
router.post("/", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.createSetting, APIS.createSetting);

/* Put Apis */
router.put("/:_id", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.updateSetting, APIS.updateSetting);

/* Delete Apis */
router.delete("/:_id", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.deleteSetting, APIS.deleteSetting);

module.exports = router;
