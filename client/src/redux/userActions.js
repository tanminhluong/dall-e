import { publicRequest, userRequest } from "../utils/requestMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersFail,
  getAllUsersStart,
  getAllUsersSuccess,
  logOutSuccess,
} from "./userSlice";
import { useNavigate } from "react-router-dom";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await publicRequest.post("/users/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });

      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      if (userInfo.password !== userInfo.confirmPassword) {
        return rejectWithValue("Password does not match");
      }
      await publicRequest.post("/users/auth/register", userInfo);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// change password action
export const changeUserPassword = createAsyncThunk(
  "user/change-password",
  async (
    { userId, currentPass, newPassword, confirmNewPassword },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (newPassword !== confirmNewPassword) {
        return rejectWithValue("New password does not match");
      }
      if (newPassword === currentPass) {
        return rejectWithValue("Please type another new password");
      }
      const { data } = await userRequest.put(`/users/${userId}/changePass`, {
        newPass: newPassword,
        curPass: currentPass,
      });

      dispatch(userLogout());
      return data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// change avatar action
export const updateUser = createAsyncThunk(
  "user/update",
  async (updateInfo, { rejectWithValue }) => {
    try {
      const { data } = await userRequest.put(`/users/${updateInfo.userId}`, {
        photo: updateInfo.base64String,
      });

      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// follow user
export const followAUser = createAsyncThunk(
  "user/follow-a-user",
  async ({ profileId, followerId, follow }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await userRequest.put(`/users/${profileId}/follow`, {
        followerId,
        follow,
      });
      dispatch(getAllUsers());
      return data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllUsers = () => async (dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const { data } = await publicRequest.get("/users");
    dispatch(getAllUsersSuccess(data.data));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data));
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch(logOutSuccess());
  } catch (error) {
    throw new Error(error);
  }
};
