const router = require("express").Router();

const { auth } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { USER_TYPE: { ADMIN, VENDOR }, } = require("../json/enums.json");

const { PRODUCT: { APIS, VALIDATOR }, } = require("../controllers");

/* Get Apis */
router.get("/:vendorId?/:productId?", auth({ isTokenRequired: false, usersAllowed: ["*"] }), APIS.getProducts);

/* Post Apis */
router.post("/", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.createProduct, APIS.createProduct);

/* Put Apis */
router.put("/:_id", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.updateProduct, APIS.updateProduct);

/* Delete Apis */
router.delete("/:_id", auth({ usersAllowed: [ADMIN, VENDOR] }), VALIDATOR.deleteProduct, APIS.deleteProduct);

module.exports = router;
