const express = require("express");

const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const crudController = require("./crud.controller");

const Post = require("../models/post.model");

router.post("", authenticate, async (req, res) => {
  req.body.user_id = req.userID;
  try {
    const post = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post("", crudController.post(Post));

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "userId", select: ["email"] })
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({ path: "userId", select: ["name"] })
      .lean()
      .exec();

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", crudController.deleteOne(Post));

router.get("", async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).send(post);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
