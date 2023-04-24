import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followAUser } from "../redux/userActions";

const Follower = ({ follower }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isFollowing =
    follower?.followers.filter((item) => item === userInfo._id).length > 0
      ? true
      : false;
  const handleFollow = (follow) => {
    dispatch(
      followAUser({
        profileId: follower._id,
        follow,
        followerId: userInfo._id,
      })
    );
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-[44px] h-[44px] border-solid border-[1px]  border-[#1b1c20] rounded-[50%] cursor-pointer overflow-hidden  ">
          <img src={follower.avatar} alt="" />
        </div>
        <span className="text-sm">{follower.profileName}</span>
      </div>
      {follower._id !== userInfo._id ? (
        isFollowing ? (
          <button
            onClick={() => handleFollow(false)}
            type="button"
            className="px-4 py-1 bg-[#d1d5db] bg-opacity-50 text-[#030712] font-semibold rounded-md"
          >
            Following
          </button>
        ) : (
          <button
            onClick={() => handleFollow(true)}
            type="button"
            className="px-4 py-1 bg-sky-700 text-white font-semibold rounded-md"
          >
            Follow
          </button>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Follower;
