const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./utils/errorHanlder");
const authRoute = require("./routes/authRoute");
const testRoute = require("./routes/testRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use("/auth", authRoute);
app.use("/test", testRoute);

app.use(errorHandler);

module.exports = app;
