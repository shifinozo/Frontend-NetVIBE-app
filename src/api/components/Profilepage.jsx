

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
      <div className="fixed md:static w-64 h-screen bg-white border-r">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex-1 ml-0 md:ml-14 px-4 md:px-10 py-8">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">

          <div className="flex flex-col md:flex-row gap-8">

            {/* Avatar */}
            <img
              src={
                user.profilePic ||
                "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
              }
              alt="profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border"
            />

            {/* Info */}
            <div className="flex-1">

              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">
                  {user.username}
                </h2>

                <button
                  onClick={() => navigate("/editProfile")}
                  className="
                    px-4 py-1.5 rounded-full text-sm font-medium
                    border border-gray-300
                    hover:bg-gray-100 transition
                  "
                >
                  Edit Profile
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-5 text-sm">
                <span>
                  <strong className="text-gray-900">{stats.posts}</strong>{" "}
                  <span className="text-gray-500">posts</span>
                </span>
                <span>
                  <strong className="text-gray-900">{stats.followers}</strong>{" "}
                  <span className="text-gray-500">followers</span>
                </span>
                <span>
                  <strong className="text-gray-900">{stats.following}</strong>{" "}
                  <span className="text-gray-500">following</span>
                </span>
              </div>

              {/* Bio */}
              <div className="mt-5 text-sm">
                <p className="font-medium text-gray-900">{user.username}</p>
                <p className="text-gray-600 max-w-md">
                  {user.bio || "No bio yet"}
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
