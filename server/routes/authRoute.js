const router = require("express").Router();
const { register, login, getUsers } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users").get(getUsers);

module.exports = router;
