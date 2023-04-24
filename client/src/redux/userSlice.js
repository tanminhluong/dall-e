import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  registerUser,
  updateUser,
  changeUserPassword,
  followAUser,
} from "./userActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  userInfo: null,
  userToken,
  users: [],
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.error = null;
    },
    getAllUsersFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    logOutSuccess: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // change pass
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changeUserPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // update followers
      .addCase(followAUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followAUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users[state.users.findIndex((item) => item._id === payload._id)] =
          payload;

        state.success = true;
      })
      .addCase(followAUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      //update avatar
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  getAllUsersFail,
  getAllUsersSuccess,
  getAllUsersStart,
  logOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
