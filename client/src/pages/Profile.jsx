import React, { useEffect, useState } from "react";
import { Card, Follower, Header, Loader, Modal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/postActions";
import { userRequest } from "../utils/requestMethods";
// import { Modal } from "flowbite-react";
import FileBase from "react-file-base64";
import { followAUser, updateUser } from "../redux/userActions";
import { useNavigate, useParams } from "react-router-dom";

const RenderCards = ({ profileId, data, title }) => {
  if (data?.length > 0)
    return data.map((post) => (
      <Card profileId={profileId} key={post._id} {...post} />
    ));
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Profile = () => {
  const { userInfo, users } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [imgURL, setImgURL] = useState(userInfo?.avatar);
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileId } = useParams();

  //logic to find profile that give by the url
  const profile = users.filter((user) => user._id === profileId)[0];
  const userPosts = posts.filter((item) => item.postedBy._id === profileId);

  const isFollowing =
    profile.followers.filter((follower) => follower._id === userInfo?._id)
      .length > 0
      ? true
      : false;

  let isSameId = profileId === userInfo?._id;

  const onImgChange = async (e) => {
    const [f] = e.target.files;
    setFile(f);
    setImgURL(URL.createObjectURL(f));
    const base64 = await getBase64(f);
    if (base64) setBase64String(base64);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleShow = () => {
    if (profileId === userInfo._id) {
      setShow(!show);
    } else {
      alert("Your not the author");
    }
  };

  const handleChangeAvatar = () => {
    setLoading(true);
    if (file) {
      dispatch(
        updateUser({
          userId: userInfo._id,
          base64String,
        })
      );

      setShowModal(false);
      setLoading(false);
    } else {
      alert("Please choose an image");
    }
  };

  const handleFollow = (follow) => {
    if (!userInfo) navigate("/auth/login");
    dispatch(
      followAUser({
        profileId,
        follow,
        followerId: userInfo._id,
      })
    );
  };

  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto px-6 mb-5">
        <div className="flex items-center gap-10 mt-6">
          <div className="relative">
            <div
              onClick={handleShow}
              className="w-[144px] h-[144px] border-solid border-[1px]  border-[#1b1c20] rounded-[50%] cursor-pointer overflow-hidden  "
            >
              <img
                src={profile.avatar}
                alt="avatar"
                className="w-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 px-3 gap-5">
            <div className="flex items-center gap-4">
              <h1 className="font-extrabold text-[32px] text-[#25272c] ">
                {profile.profileName}
              </h1>
              {!isSameId &&
                (isFollowing ? (
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
                ))}
            </div>
            <div className="flex items-center gap-10 ">
              <div className="text-base font-light">
                <span className="font-semibold">{userPosts.length}</span> posts
              </div>
              <div
                onClick={() => {
                  setShowFollowerModal(true);
                }}
                className="text-base font-light cursor-pointer"
              >
                {" "}
                <span className="font-semibold">
                  {profile.followers.length}
                </span>{" "}
                followers
              </div>
              <div
                onClick={() => {
                  setShowFollowingModal(true);
                }}
                className="text-base font-light cursor-pointer"
              >
                Following{" "}
                <span className="font-semibold">
                  {profile.followings.length}
                </span>{" "}
                users
              </div>
            </div>
          </div>
        </div>
        {show && (
          <div className="w-[200px] absolute top-[230px] left-[16px] bg-gray-50 hover:bg-gray-200 mt-4 p-4 rounded-md shadow-gray-700 z-[2] ">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowModal(true);
                setShow(!show);
              }}
            >
              Change profile avatar
            </div>
          </div>
        )}
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <RenderCards
                profileId={profileId}
                data={userPosts}
                title="No posts found"
              />
            </div>
          )}
        </div>
      </section>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="mt-4 text-2xl font-bold mx-2">Update avatar</div>
        <img
          src={imgURL}
          alt=""
          className="w-full h-[320px] px-2 my-2 object-contain"
        />
        <input type="file" onChange={onImgChange} />
        <div className="flex gap-5 mt-4 justify-end mx-4">
          <button
            onClick={handleChangeAvatar}
            className="font-inter font-medium bg-[#734fb6] text-white px-4 py-2 rounded-md"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>
      <Modal
        isVisible={showFollowerModal}
        onClose={() => setShowFollowerModal(false)}
      >
        <div className="w-[400px] text-lg text-center font-medium border-b my-1">
          Followers
        </div>
        <div className="flex flex-col gap-3 p-2 h-[320px] max-h-[360px] overflow-y-scroll">
          {profile.followers.length > 0 ? (
            profile.followers.map((follower) => (
              <Follower follower={follower} key={follower._id} />
            ))
          ) : (
            <div>No followers</div>
          )}
        </div>
      </Modal>
      <Modal
        isVisible={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
      >
        <div className="w-[400px] text-lg text-center font-medium border-b my-1">
          Following
        </div>
        <div className="flex flex-col gap-3 p-2 h-[320px] max-h-[360px] overflow-y-scroll">
          {profile.followings.length > 0 ? (
            profile.followings.map((user) => (
              <Follower follower={user} key={user._id} />
            ))
          ) : (
            <div>Not following</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Profile;
