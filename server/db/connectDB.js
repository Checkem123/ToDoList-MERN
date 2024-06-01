const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/env");

const connetcDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Problem connecting to mongodb", error);
    }
};

module.exports = connetcDB;
