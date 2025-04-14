const express = require("express");
const {RegisterUsers, LoginUser} = require("../controller/user")
const router = express.Router();

router.post("/register",RegisterUsers);
router.post("/login",LoginUser);

module.exports = router;