const Task = require("../models/taskModel");
const User = require("../models/userModel");

const getTasks = async (req, res) => {
    const tasks = await Task.find({}).populate("user", { id: 1, username: 1 });

    if (!tasks) {
        return res.status(404).send("No tasks found");
    }
    res.status(200).json(tasks);
};

const postTask = async (req, res) => {
    const id = req.user._id; // Use the authenticated user ID
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    const checkUniqueness = await Task.findOne({ title: req.body.title });

    if (!checkUniqueness) {
        const newTask = {
            title: req.body.title,
            user: user._id, // Associate the task with the user ID
        };

        const task = await Task.create(newTask);
        await task.populate("user", "username"); // Populate user field with username

        user.tasks.push(task);
        await user.save();

        return res.status(200).json(task);
    }

    res.status(409).json({ error: "Task already exists" });
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).send("Server error");
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    res.status(200).json(task);
};

module.exports = { getTasks, postTask, deleteTask, updateTask };
