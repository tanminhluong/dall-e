import { createSlice, current } from "@reduxjs/toolkit";
import { fetchAllPosts } from "./postActions";

const initialState = {
  singlePost: null,
  posts: [],

  error: null,

  loading: false,
  success: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //GET POST
    getAllPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllPostsSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.error = null;
    },
    getAllPostsFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Create one Post
    createNewPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createNewPostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts.push(payload);
      state.error = null;
      state.success = true;
    },
    createNewPostFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    updatePostComment: (state, { payload }) => {
      state.loading = false;
      state.post[state.posts.findIndex((item) => item._id === payload.id)] =
        payload.updatedPost;
    },

    // Delete Post
    deletePostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts.splice(
        state.posts.findIndex((item) => item._id === payload),
        1
      );
      state.error = null;
    },

    // like Post
    likePostSuccess: (state, { payload }) => {
      state.loading = false;
      state.posts[state.posts.findIndex((item) => item._id === payload._id)] =
        payload;
      state.error = null;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchAllPosts.pending, (state) => {
  //         state.status = "loading";
  //         state.error = null;
  //       })
  //       .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
  //         state.status = "succeeded";
  //         state.posts = [payload];
  //         state.error = null;
  //       })
  //       .addCase(fetchAllPosts.rejected, (state, { payload }) => {
  //         state.status = "failed";
  //         state.error = payload;
  //       });
  //   },
});

export const {
  getAllPostsStart,
  getAllPostsSuccess,
  getAllPostsFail,
  createNewPostStart,
  createNewPostFail,
  createNewPostSuccess,
  updatePostComment,
  deletePostSuccess,
  likePostSuccess,
} = postSlice.actions;

export default postSlice.reducer;
