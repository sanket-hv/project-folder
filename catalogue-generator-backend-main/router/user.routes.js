const router = require("express").Router();
const { USER: { APIS, VALIDATOR }, } = require("../controllers");

// Login User
router.post("/signin", VALIDATOR.loginUser, APIS.loginUser);

// Create new credential
router.post("/signup", VALIDATOR.createUser, APIS.createUser);

module.exports = router;
