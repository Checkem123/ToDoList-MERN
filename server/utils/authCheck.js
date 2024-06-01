const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/env");

const authCheck = (req, res, next) => {
    try {
        const token = req.get("Authorization")
            ? req.get("Authorization").split(" ")[1]
            : null;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log("Broblem with dogen", error);
        next(error);
    }
};

module.exports = authCheck;
