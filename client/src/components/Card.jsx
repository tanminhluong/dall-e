import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";

import { download } from "../assets";
import { downloadImage } from "../utils";
import LikeButton from "./LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../utils/requestMethods";
import { Link } from "react-router-dom";
import { LazyImage, Modal } from "./index";
import { deletePost, likePost } from "../redux/postActions";

const Card = ({
  _id,
  name,
  prompt,
  photo,
  liked,
  postedBy,
  type,
  profileId,
}) => {
  const { userInfo } = useSelector((state) => state.user);
  // const [totalLiked, setTotalLiked] = useState(liked);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let isSameId;

  if (userInfo) isSameId = profileId === userInfo._id;

  const handleLike = async (like) => {
    // if (userInfo) {
    //   const { data } = await userRequest.put("/like", {
    //     userId: userInfo._id,
    //     postId: _id,
    //     like,
    //   });

    //   setTotalLiked(data.liked);
    // }
    dispatch(
      likePost({
        like,
        postId: _id,
        userId: userInfo._id,
      })
    );
  };

  const handleShow = () => {
    console.log(_id);
    setShow(!show);
  };

  const handleDelete = () => {
    dispatch(deletePost(_id));
  };

  return (
    <>
      <div
        className={
          type !== "card"
            ? "rounded-xl group relative lg:max-w-[32%] md:max-w-[48%] xs:max-w-[90%] mt-3 transition "
            : "rounded-xl group relative shadow_card hover:shadow-cardhover card transition  "
        }
      >
        <Link to={`/posts/${_id}`}>
          {/* <img
            src={photo}
            alt={prompt}
            className="w-full h-auto object-cover rounded-xl"
          /> */}
          <LazyImage src={photo} alt={prompt} />
        </Link>
        {(type !== "card") & isSameId ? (
          <div
            onClick={handleShow}
            className="absolute top-2 right-4 w-6 h-6 rounded-full hover:bg-gray-700 hover:rounded-full transition ease-in-out delay-150"
          >
            <FiMoreHorizontal className="text-2xl text-white cursor-pointer" />
          </div>
        ) : (
          <></>
        )}
        {show && (
          <div className="max-w-[150px] absolute top-[20px] right-[10px] bg-gray-50 hover:bg-gray-200 mt-4 p-4 rounded-md shadow-gray-700 z-[2] transition ease-in-out delay-150 ">
            <div
              className="cursor-pointer flex gap-2 items-center"
              onClick={() => {
                setShowModal(true);
                setShow(!show);
              }}
            >
              <span> Delete </span>
              <ImBin2 />
            </div>
          </div>
        )}
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md  ">
          <p className="text-white text-md overflow-y-auto prompt ">{prompt}</p>
          <div className="mt-5 flex justify-between items-center gap-2">
            <Link to={`/profile/${postedBy._id}`}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold ">
                  <img
                    src={postedBy.avatar}
                    alt="user avatar"
                    className="object-contain"
                  />
                </div>
                <p className="text-white text-sm">{name}</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <LikeButton
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                liked={liked}
              />
              <button
                type="button"
                className="outline-none bg-transparent border-none "
                onClick={() => downloadImage(_id, photo)}
              >
                <img
                  src={download}
                  alt="download"
                  className="w-6 h-6 object-contain invert "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="w-full text-center mt-5 mb-5">
          Are you sure to delete this post ?
        </div>
        <div className="flex gap-5 mt-4 justify-end mx-4">
          <button
            onClick={handleDelete}
            className="font-inter font-medium bg-[#734fb6] text-white px-4 py-2 rounded-md"
          >
            {loading ? "Updating..." : "Delete"}
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default Card;
