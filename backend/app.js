const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", tasksRoutes);
app.use("/", authRoutes);

app.use(errorHandler);

module.exports = app;
