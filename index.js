const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const meetings = require("./routes/meetingRoutes");
const users = require("./routes/userRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serve index.html for "/"
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});
app.use("/api/meetings", meetings);
app.use("/api/users", users);

app.use(errorHandler);

module.exports = app;
