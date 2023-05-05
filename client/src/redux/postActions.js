import { publicRequest, userRequest } from "../utils/requestMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewPostFail,
  createNewPostStart,
  createNewPostSuccess,
  deletePostSuccess,
  getAllPostsFail,
  getAllPostsStart,
  getAllPostsSuccess,
  likePostSuccess,
  updatePostComment,
} from "./postSlice";

export const fetchAllPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await publicRequest.get("/posts");

  return data.reverse();
});

export const getAllPosts = () => async (dispatch) => {
  dispatch(getAllPostsStart());
  try {
    const { data } = await publicRequest.get("/posts");

    dispatch(getAllPostsSuccess(data.data.reverse()));
  } catch (error) {
    dispatch(getAllPostsFail(error.response.data));
  }
};

export const createNewPost = (post) => async (dispatch) => {
  dispatch(createNewPostStart());
  try {
    const { data } = await publicRequest.post("/posts", {
      name: post.name,
      prompt: post.prompt,
      photo: post.photo,
      postedBy: post.postedBy,
    });

    dispatch(createNewPostSuccess(data.data));
    dispatch(getAllPosts());
  } catch (error) {
    dispatch(createNewPostFail(error.response.data));
  }
};

// comment
export const updatePosts = (id, updateInfo) => async (dispatch) => {
  try {
    const { data } = await userRequest.put(`/posts/${id}`, {
      userId: updateInfo.userId,
      message: updateInfo.comment,
    });
    const updatedPost = data.data;
    dispatch(updatePostComment(id, updatedPost));
    return data.data;
  } catch (e) {
    throw new Error("error");
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await userRequest.delete(`/posts/${id}`);
    dispatch(deletePostSuccess(id));
    // dispatch(getAllPosts());
    return "Delete success";
  } catch (error) {
    throw new Error(error);
  }
};

export const likePost =
  ({ like, postId, userId }) =>
  async (dispatch) => {
    try {
      const { data } = await userRequest.put("/like", {
        userId,
        postId,
        like,
      });
      dispatch(likePostSuccess(data));
    } catch (err) {
      throw new Error(err.response.data);
    }
  };
