import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    prompt: {
      type: "string",
      required: true,
    },
    photo: {
      type: "string",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
