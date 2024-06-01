const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/env");

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const duplicateEmail = await User.findOne({ email }).exec();
    if (duplicateEmail) {
        return res
            .status(409)
            .json({ message: "User with that email already exists" });
    }

    const duplicateUsername = await User.findOne({ username }).exec();
    if (duplicateUsername) {
        return res
            .status(409)
            .json({ message: "User with that username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userObject = {
        username,
        email,
        password: hashedPassword,
    };

    const user = await User.create(userObject);
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username }).exec();
    if (!user) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
        {
            username,
            email: user.email,
            _id: user._id,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.status(200).json({
        token: token,
        user: { username, email: user.email },
    });
};

module.exports = { register, login };
