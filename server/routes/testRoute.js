const router = require("express").Router();
const { getTests, postTest } = require("../controllers/testController");
const authCheck = require("../utils/authCheck");

router.route("/").get(authCheck, getTests).post(authCheck, postTest);

module.exports = router;
