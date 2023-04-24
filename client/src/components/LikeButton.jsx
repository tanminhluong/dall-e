import React, { useEffect, useState } from "react";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";

const LikeButton = ({ liked, handleLike, handleDislike, detail }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const filterLikes = liked?.filter((item) => item === userInfo?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, liked]);

  return (
    <div className="flex gap-0.5">
      <div className="flex justify-center items-center cursor-pointer mr-2 gap-2">
        {alreadyLiked ? (
          <div
            className={
              detail
                ? "bg-primary rounded-full p-[2px]"
                : "bg-primary text-[#ebdce4] rounded-full p-[2px]"
            }
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className={
              detail
                ? "bg-primary rounded-full p-[2px]"
                : "bg-primary text-[#ebdce4] rounded-full p-[2px]"
            }
            onClick={handleLike}
          >
            <MdOutlineFavoriteBorder className="text-lg md:text-2xl" />
          </div>
        )}
        <p
          className={
            detail
              ? "text-md font-semibold"
              : "text-md font-semibold text-[#ebdce4] "
          }
        >
          {liked?.length || 0}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
