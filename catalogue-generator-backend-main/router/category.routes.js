const router = require("express").Router();

const { auth } = require("../middleware/auth.middleware");


function requireCategoryImage(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Category image is required." });
  }
  next();
}

const {
  USER_TYPE: { ADMIN, VENDOR },
} = require("../json/enums.json");
const {
  CATEGORY: { APIS, VALIDATOR },
} = require("../controllers");
const upload = require("../helper/imgUpload.helper");

/* Get Apis */
router.get(
  "/:vendorId?/:categoryId?",
  auth({ isTokenRequired: false, usersAllowed: ["*"] }),
  APIS.getCategories
);
router.get(
  "/name/categories/:vendorId",
  auth({ isTokenRequired: false, usersAllowed: ["*"] }),
  APIS.getCategoriesName
);

/* Post Apis */
router.post(
  "/",
  auth({ usersAllowed: [ADMIN, VENDOR] }),
  upload.array("categoryImages", 5),
  requireCategoryImage,
  VALIDATOR.createCategory,
  APIS.createCategory
);

/* Put Apis */
router.put(
  "/:_id",
  auth({ usersAllowed: [ADMIN, VENDOR] }),
  VALIDATOR.updateCategory,
  APIS.updateCategory
);

/* Delete Apis */
router.delete(
  "/:_id",
  auth({ usersAllowed: [ADMIN, VENDOR] }),
  VALIDATOR.deleteCategory,
  APIS.deleteCategory
);

module.exports = router;
