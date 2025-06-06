const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const { USER_TYPE: { ADMIN }, } = require("../json/enums.json");
const { ROLE: { APIS, VALIDATOR }, } = require("../controllers");

/* Get Apis */
router.get("/", auth({ usersAllowed: [ADMIN] }), APIS.getRole);

/* Post Apis */
router.post("/", auth({ usersAllowed: [ADMIN] }), VALIDATOR.createRole, APIS.createRole);

module.exports = router;
