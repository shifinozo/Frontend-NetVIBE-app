

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../axios";
import Sidebar from "../pages/navbar";
import PostModal from "./PostModal";

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);


  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const profileRes = await api.get(`/profile/${username}`);

        localStorage.setItem("userId", profileRes.data.user._id);
        setProfile(profileRes.data);

        const postsRes = await api.get(
          `/posts/user/${profileRes.data.user._id}`
        );

        setPosts(postsRes.data);
      } catch (error) {
        console.error("Profile load failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [username]);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );

  const { user, stats } = profile;

  return (
    <div className="flex min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 ml-0 md:ml-64 px-6 md:px-10 py-10 pt-20 pb-20 md:py-12">

        {/* Profile Section */}
        <div className="max-w-4xl mx-auto">

          <div className="flex flex-row gap-4 md:gap-14 items-start pb-4 md:pb-12 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">

            {/* Avatar */}
            <img
              src={
                user.profilePic ||
                "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
              }
              alt="profile"
              className="w-20 h-20 md:w-36 md:h-36 rounded-full object-cover flex-shrink-0"
            />

            {/* Info */}
            <div className="flex-1">

              {/* Username + Button Row */}
              <div className="flex flex-col md:flex-row items-center md:items-center justify-between md:justify-start gap-2 md:gap-5 mb-4 md:mb-5">
                <h2 className="text-xl md:text-2xl font-light text-gray-900 dark:text-white">
                  {user.username}
                </h2>

                <button
                  onClick={() => navigate("/editProfile")}
                  className="px-4 md:px-7 py-1.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-white transition border border-gray-200 dark:border-zinc-700 shadow-sm"
                >
                  Edit profile
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 md:gap-12 mb-5 text-sm md:text-base">
                <span>
                  <strong className="text-gray-900 dark:text-white font-semibold">{stats.posts}</strong>{" "}
                  <span className="text-gray-600 dark:text-gray-400">posts</span>
                </span>
                <span>
                  <strong className="text-gray-900 dark:text-white font-semibold">{stats.followers}</strong>{" "}
                  <span className="text-gray-600 dark:text-gray-400">followers</span>
                </span>
                <span>
                  <strong className="text-gray-900 dark:text-white font-semibold">{stats.following}</strong>{" "}
                  <span className="text-gray-600 dark:text-gray-400">following</span>
                </span>
              </div>

              {/* Bio */}
              <div className="text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-wrap">
                  {user.bio || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">
            No posts yet
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-1 md:gap-4 mt-8">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => setSelectedPostId(post._id)}
                className="
                  aspect-square overflow-hidden cursor-pointer
                  bg-gray-100 dark:bg-zinc-900 rounded-md md:rounded-lg shadow-sm
                  hover:opacity-90 transition
                "
              >
                <img
                  src={post.media}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedPostId && (
        <PostModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          onDelete={(id) =>
            setPosts((prev) => prev.filter((p) => p._id !== id))
          }
        />
      )}
    </div>
  );
}
