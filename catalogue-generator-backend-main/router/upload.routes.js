const router = require("express").Router();
const { UPLOAD: { APIS }, } = require("../controllers");
const upload = require("../helper/imgUpload.helper");
const { auth } = require("../middleware/auth.middleware");
const {
  USER_TYPE: { ADMIN, VENDOR },
} = require("../json/enums.json");

// const upload = require("../middleware/upload.middleware");
const { requireCategoryImage } = require("./category.routes");

// router.post("/", upload.array("images", 5), APIS.uploadImages);
router.post("/",  auth({ usersAllowed: [ADMIN, VENDOR] }),  upload.array("categoryImages", 5), APIS.uploadImages);


module.exports = router;
