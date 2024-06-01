const errorHandler = (error, req, res, next) => {
    switch (error) {
        case error.name === "CastError":
            console.log("objectid error");
            return res.status(404).send({ error: "malformatted id" });
        case error.name === "MongoServerError" &&
            error.message.includes("E11000 duplicate key error"):
            return res
                .status(400)
                .json({ error: "username or email already exists" });
        case error.name === "ValidationError":
            return res.status(400).send({ error: "validation error" });
        case error.name === "JsonWebTokenError":
            return res.status(400).send({ error: "invalid token" });
        case error.name === "TokenExpiredError":
            return res.status(400).send({ error: "token expired" });
        default:
            return res.status(500).send({ error: "something went wrong" });
    }
};

module.exports = errorHandler;
