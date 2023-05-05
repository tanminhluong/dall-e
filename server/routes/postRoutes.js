import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/Post.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "comments",
        populate: {
          path: "userId",

          model: "User",
        },
      })
      .populate("postedBy", "-password");
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// CREATE a POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo, postedBy } = req.body;

    const photoURL = await cloudinary.uploader.upload(photo, {
      format: "jpg",
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoURL.secure_url,
      postedBy,
    });

    if (newPost) {
      await User.findByIdAndUpdate(postedBy, {
        $push: {
          postList: newPost._id,
        },
      });
    }

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// add comment
router.route("/:postId").put(async (req, res) => {
  const { postId } = req.params;

  const { userId, message } = req.body;
  let commentId;
  try {
    const newComment = await Comment.create({
      postId,
      userId,
      message,
    });
    if (newComment) {
      commentId = newComment.id;
    }
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: commentId,
        },
      },
      { new: true }
    ).populate({
      path: "comments",
      populate: {
        path: "userId",
        model: "User",
      },
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// delete post
router.route("/:postId").delete(verifyToken, async (req, res) => {
  const { postId } = req.params;
  try {
    await Post.findByIdAndDelete(postId);
    res.status(201).json({ success: true, data: "Post has been deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
export default router;
