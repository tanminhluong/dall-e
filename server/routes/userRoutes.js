import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";

import { login, register } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import User from "../models/User.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);

router.route("/:userId").put(verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { photo } = req.body;

  try {
    const photoURL = await cloudinary.uploader.upload(photo);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: photoURL.secure_url,
      },
      {
        new: true,
      }
    );
    if (updatedUser) res.status(201).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// get all users
router.route("/").get(async (req, res) => {
  try {
    const users = await User.find()
      .populate("followers", "-password")
      .populate("followings", "-password")
      .select("-password");
    res.status(201).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//change password
router.route("/:userId/changePass").put(verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { curPass, newPass } = req.body;
  const salt = await bcrypt.genSalt(10);
  let encryptedPass = await bcrypt.hash(newPass, salt);

  try {
    const user = await User.findOne({ _id: userId });

    if (user && (await user.matchPassword(curPass))) {
      await user.updateOne({
        password: encryptedPass,
      });

      res
        .status(201)
        .json({ success: true, data: "Your password has been updated" });
    } else {
      res.status(401).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// follow
router.route("/:userId/follow").put(verifyToken, async (req, res) => {
  const { followerId, follow } = req.body;
  const { userId } = req.params;

  if (follow) {
    const data = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          followers: followerId,
        },
      },
      { new: true }
    );
    if (data) {
      await User.findByIdAndUpdate(
        followerId,
        {
          $push: {
            followings: data._id,
          },
        },
        { new: true }
      );
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(400).json("Post not found");
    }
  } else {
    const data = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          followers: followerId,
        },
      },
      { new: true }
    );
    if (data) {
      await User.findByIdAndUpdate(
        followerId,
        {
          $pull: {
            followings: data._id,
          },
        },
        { new: true }
      );
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(400).json("Post not found");
    }
  }
});

export default router;
