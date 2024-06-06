const router = require("express").Router();
const {
    getTasks,
    postTask,
    deleteTask,
    updateTask,
} = require("../controllers/taskController");
const authCheck = require("../utils/authCheck");

router.route("/").get(getTasks).post(authCheck, postTask);
router.route("/:id").delete(deleteTask).put(updateTask);

module.exports = router;
