const Test = require("../models/testModel");

const getTests = async (req, res) => {
    const tests = await Test.find().populate("user", { id: 1, username: 1 });
    res.status(200).json(tests);
};

const postTest = async (req, res) => {
    if (!req.user) {
        return res.send({ error: "You must be logged in" });
    }

    const { name } = req.body;

    if (!name) {
        return res.send({ error: "A name is required" });
    }

    const nameExists = await Test.findOne({ name });
    if (nameExists) {
        return res.send({ error: "Name already exists" });
    }

    const test = new Test({
        name,
        user: req.user._id,
    });

    await test.save();
    res.status(200).json(test);
};

module.exports = { getTests, postTest };
