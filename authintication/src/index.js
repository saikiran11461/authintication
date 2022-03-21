const express = require("express");

const usersController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");

const { register, login } = require("./controllers/auth.controller");

const app = express();

app.use(express.json());

app.use("/users", usersController);

app.post("/register", register);

app.post("/login", login);

app.use("/post", postController);
// app.use("/comments", commentsController);

module.exports = app;
