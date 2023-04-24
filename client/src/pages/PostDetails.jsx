import React, { useEffect, useRef, useState } from "react";
import { Comments, FormField, Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import LikeButton from "../components/LikeButton";
import { userRequest } from "../utils/requestMethods";
import { likePost, updatePosts } from "../redux/postActions";

const PostDetails = () => {
  const { posts } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const currentPost = posts.filter((item) => item._id === postId)[0];

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(currentPost.comments);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const inputRef = useRef();

  const forcusInput = () => {
    inputRef.current.focus();
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (comment) {
      setIsPostingComment(true);
      // const commentsArr = dispatch(
      //   updatePosts(currentPost._id, {
      //     userId: userInfo._id,
      //     comment: comment,
      //   })
      // );

      const { data } = await userRequest.put(`/posts/${currentPost._id}`, {
        userId: userInfo._id,
        message: comment,
      });

      setComments(data.data.comments);
      setComment("");
      setIsPostingComment(false);
    }
  };

  const handleLike = (like) => {
    dispatch(
      likePost({
        like,
        postId: postId,
        userId: userInfo._id,
      })
    );
  };
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-3 max-w-[475px] mx-auto mt-5">
          <div className="flex items-center justify-between">
            <Link to={`/profile/${currentPost.postedBy._id}`}>
              <div className="flex items-center gap-5">
                <div className="rounded-[50%] w-[44px] h-[44px] overflow-hidden ">
                  <img
                    className="object-contain"
                    src={currentPost.postedBy.avatar}
                    alt=""
                  />
                </div>
                <p className="text-base font-semibold">{currentPost.name}</p>
              </div>
            </Link>
            <button type="button">
              <FiMoreHorizontal className="text-[18px]" />
            </button>
          </div>
          <div>
            <h3>Prompt:</h3>
            <p className="text-sm">{currentPost.prompt}</p>
          </div>
          <div className="w-full rounded-[4px] overflow-hidden ">
            <img src={currentPost.photo} alt="post photo" />
          </div>
          <div className="flex items-center gap-3 ">
            <LikeButton
              detail={true}
              liked={currentPost.liked}
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />
            <BiMessageRounded
              onClick={forcusInput}
              className="text-[24px] cursor-pointer"
            />
          </div>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={comments}
            isPostingComment={isPostingComment}
            inputRef={inputRef}
          />
        </div>
      </section>
    </>
  );
};

export default PostDetails;
