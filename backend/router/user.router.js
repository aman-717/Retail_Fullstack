const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user.controller.js");
router.route("/signup").post(usercontroller.signUp);
router.route("/login").post(usercontroller.login);
router.route("/logout").get(usercontroller.logOut);
module.exports = router;
