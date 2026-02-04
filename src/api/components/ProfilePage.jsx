

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 ml-0 md:ml-64 px-4 md:px-8 py-8 pt-20 pb-20 md:py-8">

        {/* Profile Section */}
        <div className="max-w-4xl mx-auto">

          <div className="flex flex-row gap-4 md:gap-12 items-start pb-4 md:pb-8 border-b border-gray-200">

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
                <h2 className="text-xl md:text-2xl font-light text-gray-900">
                  {user.username}
                </h2>

                <button
                  onClick={() => navigate("/editProfile")}
                  className="px-4 md:px-6 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-900 transition"
                >
                  Edit profile
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-10 mb-4 text-sm md:text-base">
                <span>
                  <strong className="text-gray-900 font-semibold">{stats.posts}</strong>{" "}
                  <span className="text-gray-600">posts</span>
                </span>
                <span>
                  <strong className="text-gray-900 font-semibold">{stats.followers}</strong>{" "}
                  <span className="text-gray-600">followers</span>
                </span>
                <span>
                  <strong className="text-gray-900 font-semibold">{stats.following}</strong>{" "}
                  <span className="text-gray-600">following</span>
                </span>
              </div>

              {/* Bio */}
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user.username}</p>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
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
                  bg-gray-100 rounded-lg
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
