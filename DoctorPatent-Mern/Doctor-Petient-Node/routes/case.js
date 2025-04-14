const express = require("express");
const {newCase, updateCase, getCases, getCasesUsers} = require("../controller/case");

const router = express.Router();


router.post("/new-case",newCase);
router.put("/update-case",updateCase);
router.get("/get-doctor",getCases);
router.get("/get-users",getCasesUsers);


module.exports = router