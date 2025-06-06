const router = require("express").Router();

const { auth } = require("../middleware/auth.middleware");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../json/enums.json");
const { VENDOR: { APIS, VALIDATOR }, } = require("../controllers");

/* Get Apis */
router.get("/:_id?", auth({ isTokenRequired: false, usersAllowed: ["*"] }), APIS.getVendor);

/* Post Apis */
router.put("/:_id", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.updateVendor, APIS.updateVendor);

/* Delete Apis */
router.delete("/:_id", auth({ usersAllowed: [ADMIN] }), APIS.deleteVendor);

module.exports = router;
