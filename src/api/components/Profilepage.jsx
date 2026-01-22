
// -------------------new

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../axios";
import Sidebar from "../pages/navbar";
import PostModal from "../components/PostModal";

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
        const token = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("userId");
        console.log("currentUserId:",currentUserId);

        const profileRes = await api.get(`/profile/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(profileRes.data);

      console.log("after loggeddd:",profileRes.data.user._id);
      
      localStorage.setItem("userId", profileRes.data.user._id);
        
        setProfile(profileRes.data);

        const postsRes = await api.get(
          `/posts/user/${profileRes.data.user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center">User not found</div>;

  const { user, stats } = profile;

  return (
    <div className="flex min-h-screen">
      <div className="fixed md:static w-64 h-screen bg-gray-100">
        <Sidebar />
      </div>

      <main className="flex-1 px-4 md:px-10 py-8 w-full ml-0 md:ml-64">

        <div className="flex flex-col md:flex-row gap-10 border-b pb-8">
          <img
            src={user.profilePic || "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"}
            alt="profile"
            className="w-36 h-36 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-light">{user.username}</h2>
              <button
                onClick={() => navigate("/editProfile")}
                className="border px-4 py-1 rounded-md text-sm"
              >
                Edit Profile
              </button>
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <span><strong>{stats.posts}</strong> posts</span>
              <span><strong>{stats.followers}</strong> followers</span>
              <span><strong>{stats.following}</strong> following</span>
            </div>

            <div className="mt-4 text-sm">
              <p className="font-medium">{user.username}</p>
              <p className="text-gray-600">{user.bio || "No bio yet"}</p>
            </div>
          </div>
        </div>


        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No posts yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="aspect-square cursor-pointer"
                onClick={() => setSelectedPostId(post._id)}
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

