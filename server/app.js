const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./utils/errorHanlder");
const authRoute = require("./routes/authRoute");
const testRoute = require("./routes/testRoute");
const taskRoute = require("./routes/taskRoute");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // if you need to send cookies
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use("/auth", authRoute);
app.use("/test", testRoute);
app.use("/api/tasks", taskRoute);

app.use(errorHandler);

module.exports = app;
