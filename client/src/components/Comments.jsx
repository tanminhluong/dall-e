import React, { useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Comments = ({
  comment,
  comments,
  addComment,
  setComment,
  isPostingComment,
  inputRef,
}) => {
  return (
    <div className="relative border-t-2 border-gray-200  mt-4 mb-4 bg-[#F8F8F8] border-b-2 lg:pb-[100px] pb-[100px]">
      <div className="overflow-y-scroll pt-4 px-5 lg:h-[350px]">
        {comments.length ? (
          comments.map((item, index) => (
            <div className="flex items-start gap-3 mt-4" key={index}>
              <div className="rounded-[50%] w-[36px] h-[36px] overflow-hidden ">
                <img
                  className="object-contain"
                  src={item.userId.avatar}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <div className="font-medium hover:underline ">
                    <Link to={`/profile/${item.userId._id}`}>
                      {item.userId.profileName}
                    </Link>
                  </div>
                  <div className="text-[14px]">{item.message}</div>
                </div>
                <div className="flex">
                  <span className="text-[12px] text-gray-400">
                    {moment(new Date(item.createdAt)).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p> No comments yet</p>
        )}
      </div>
      <div className="absolute w-full bottom-0 left-0  pb-6 px-2 md:px-10 ">
        <form onSubmit={addComment} className="flex gap-4">
          <input
            ref={inputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-primary px-4 py-4 text-sm font-medium border-2 w-[250px] md:w-[320px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            placeholder="Add comment.."
          />
          <button className="text-sm text-gray-900 " onClick={addComment}>
            {isPostingComment ? "Commenting..." : "Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
