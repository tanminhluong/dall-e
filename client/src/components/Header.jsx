import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/userActions";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    dispatch(userLogout());

    navigate("/", { replace: true });
  };
  return (
    <header className="w-full flex justify-between bg-white items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain " />
      </Link>
      {userInfo ? (
        <>
          <div
            onClick={handleShow}
            className="relative w-[44px] h-[44px] border-solid border-[1px]  border-[#1b1c20] rounded-[50%] cursor-pointer overflow-hidden  "
          >
            <img
              src={userInfo.avatar}
              alt="avatar"
              className="w-full object-contain"
            />
          </div>
          {show && (
            <div className="w-[200px] absolute top-[48px] right-[28px] bg-gray-50  mt-4 overflow-hidden  rounded-md drop-shadow-lg z-[2] ">
              <div className="w-full px-4 p-2 hover:bg-gray-200">
                <Link to={`/profile/${userInfo._id}`}>Go to your Profile</Link>
              </div>
              <div className="w-full px-4 p-2 hover:bg-gray-200">
                <Link to={`/profile/${userInfo._id}/changePass`}>
                  Change password
                </Link>
              </div>
              <div
                onClick={handleLogout}
                className="w-full px-4 p-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/auth/login"
          className="font-inter font-medium bg-[#e469ff] text-white px-4 py-2 rounded-md"
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
