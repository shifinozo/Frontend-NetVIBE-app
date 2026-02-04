

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
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-64 max-w-4xl mx-auto pt-20 pb-20 md:py-0">

        <div className="hidden md:flex sticky top-0 z-20 bg-white border-b px-6 py-3 items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            {profile.username}
          </h1>
        </div>

        <div className="px-6 py-6">
          <ProfileHeader
            user={profile}
            isOwnProfile={profile._id === currentUserId}
            isFollowing={isFollowing}
            requestSent={requestSent}
            onFollow={handleFollow}
            onMessage={handleMessage}
          />

          {profile.isPrivate && !isFollowing ? (
            <p className="text-center mt-10 text-gray-500">
              🔒 This account is private
            </p>
          ) : (
            <ProfilePosts userId={id} />
          )}
        </div>
      </div>
    </div>
  );
}


