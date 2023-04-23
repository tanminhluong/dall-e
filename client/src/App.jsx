import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePost,
  Login,
  Register,
  Profile,
  PostDetails,
  ChangePassword,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route exact path="/posts/:postId" element={<PostDetails />} />
        <Route exact path="/profile/:profileId" element={<Profile />} />
        <Route
          exact
          path="/profile/:profileId/changePass"
          element={<ChangePassword />}
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
