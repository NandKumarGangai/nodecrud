const express = require("express");
const { addUser, verifyUser } = require("../controllers/user");

const router = express.Router();

router.route("/register").post(addUser);
router.route("/login").post(verifyUser);

module.exports = router;
