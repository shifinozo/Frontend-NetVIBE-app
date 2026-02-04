

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import { api } from "../axios";
import Sidebar from "../pages/navbar";
import { socket } from "../socket";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");



  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    socket.on("follow-request-rejected", ({ userId }) => {
      if (userId === id) {
        setRequestSent(false);
        setIsFollowing(false);
      }
    });

    socket.on("follow-request-accepted", ({ userId }) => {
      if (userId === id) {
        setRequestSent(false);
        setIsFollowing(true);
      }
    });

    return () => {
      socket.off("follow-request-rejected");
      socket.off("follow-request-accepted");
    };
  }, [id]);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        const user = res.data.user;

        setProfile(user);
        setIsFollowing(
          user.followers.some(
            (f) => f._id.toString() === currentUserId
          )
        );

        setRequestSent(
          user.followRequests?.some(
            (r) => r._id.toString() === currentUserId
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUserId]);

  const handleFollow = async () => {
    try {

      const res = await api.post(`/follow/${id}`);

      if (res.data.requested) {
        setRequestSent(true);
        return;
      }

      //  refetch prof
      const profileRes = await api.get(`/users/${id}`);
      const user = profileRes.data.user;
      console.log("workedd", profileRes)
      setProfile(user);

      setIsFollowing(
        user.followers.some(
          (f) => f._id.toString() === currentUserId
        )
      );
      console.log("workedd", currentUserId);


    } catch (err) {
      console.error(err);
    }
  };
  const handleMessage = async () => {
    try {
      const res = await api.get(`/chat/conversation/${id}`);
      navigate("/Messages", { state: res.data });
    } catch (err) {
      console.error(err);
    }
  };



  if (loading) return <p className="p-6">Loading...</p>;
  if (!profile) return <p className="p-6">User not found</p>;

  return (
    <div className="flex min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-64 max-w-4xl mx-auto py-0">

        <div className="hidden md:flex sticky top-0 z-20 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 px-6 py-3 items-center gap-4 transition-colors duration-300">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-gray-100 transition"
          >
            <FiArrowLeft size={22} />
          </button>

          <h1 className="text-lg font-semibold dark:text-gray-100">
            {profile.username}
          </h1>
        </div>

        <div className="px-6 md:px-10 py-10 pt-20 pb-20 md:py-10">
          <ProfileHeader
            user={profile}
            isOwnProfile={profile._id === currentUserId}
            isFollowing={isFollowing}
            requestSent={requestSent}
            onFollow={handleFollow}
            onMessage={handleMessage}
          />

          {profile.isPrivate && !isFollowing ? (
            <div className="text-center mt-20">
              <span className="text-5xl opacity-40 grayscale">🔒</span>
              <p className="mt-6 text-gray-700 dark:text-gray-200 font-semibold text-lg">This account is private</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Follow this account to see their photos and videos.</p>
            </div>
          ) : (
            <ProfilePosts userId={id} />
          )}
        </div>
      </div>
    </div>
  );
}


