import express from "express";
import Post from "../models/Post.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").put(verifyToken, async (req, res) => {
  const { userId, postId, like } = req.body;

  const data = like
    ? await Post.findByIdAndUpdate(
        postId,
        {
          $push: { liked: userId },
        },
        {
          new: true,
        }
      )
    : await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { liked: userId },
        },
        {
          new: true,
        }
      ).populate("liked", "-password");

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json("Post not found");
  }
});

export default router;
