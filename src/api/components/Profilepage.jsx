

// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import Sidebar from "../pages/navbar";

// export default function ProfilePage() {
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfileAndPosts = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // 🔹 Fetch profile
//         const profileRes = await api.get(`/profile/${username}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setProfile(profileRes.data);

//         // 🔹 Fetch posts of this user
//         const postsRes = await api.get(
//           `/posts/user/${profileRes.data.user._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPosts(postsRes.data);
//       } catch (error) {
//         console.error("Profile load failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileAndPosts();
//   }, [username]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         User not found
//       </div>
//     );
//   }

//   const { user, stats } = profile;

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="fixed md:static w-64 h-screen bg-gray-100">
//         <Sidebar />
//       </div>

//       {/* Main */}
//       <main className="flex-1 px-4 md:px-10 py-8 w-full ml-0 md:ml-64">

//         {/* Profile header */}
//         <div className="flex flex-col md:flex-row gap-10 border-b pb-8">

//           <div className="flex justify-center md:justify-start">
//             <img
//               src={
//                 user.profilePic ||
//                 "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
//               }
//               alt="profile"
//               className="w-36 h-36 rounded-full object-cover"
//             />
//           </div>

//           <div className="flex-1">
//             <div className="flex items-center gap-4">
//               <h2 className="text-2xl font-light">{user.username}</h2>
//               <button
//                 onClick={() => navigate("/EditProfile")}
//                 className="border px-4 py-1 rounded-md text-sm font-medium"
//               >
//                 Edit Profile
//               </button>
//             </div>

//             <div className="flex gap-6 mt-4 text-sm">
//               <span>
//                 <strong>{stats.posts}</strong> posts
//               </span>
//               <span>
//                 <strong>{stats.followers}</strong> followers
//               </span>
//               <span>
//                 <strong>{stats.following}</strong> following
//               </span>
//             </div>

//             <div className="mt-4 text-sm">
//               <p className="font-medium">{user.username}</p>
//               <p className="text-gray-600">
//                 {user.bio || "No bio yet"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-12 text-sm mt-6 border-b">
//           <button className="border-b-2 border-black pb-3 font-medium">
//             POSTS
//           </button>
//         </div>

//         {/* Posts Grid */}
//         {posts.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10">
//             No posts yet
//           </p>
//         ) : (
//           <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
//             {posts.map((post) => (
//               <div key={post._id} className="aspect-square">
//                 <img
//                   src={post.media}
//                   alt="post"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// -----------------------------------------------------------
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import Sidebar from "../pages/navbar";
// import PostModal from "../components/PostModal"; // Import the modal

// export default function ProfilePage() {
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPost, setSelectedPost] = useState(null); // Selected post for modal

//   useEffect(() => {
//     const fetchProfileAndPosts = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // 🔹 Fetch profile
//         const profileRes = await api.get(`/profile/${username}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setProfile(profileRes.data);

//         // 🔹 Fetch posts of this user
//         const postsRes = await api.get(
//           `/posts/user/${profileRes.data.user._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setPosts(postsRes.data);
//       } catch (error) {
//         console.error("Profile load failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileAndPosts();
//   }, [username]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         User not found
//       </div>
//     );
//   }

//   const { user, stats } = profile;

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="fixed md:static w-64 h-screen bg-gray-100">
//         <Sidebar />
//       </div>

//       {/* Main */}
//       <main className="flex-1 px-4 md:px-10 py-8 w-full ml-0 md:ml-64">
//         {/* Profile header */}
//         <div className="flex flex-col md:flex-row gap-10 border-b pb-8">
//           <div className="flex justify-center md:justify-start">
//             <img
//               src={
//                 user.profilePic ||
//                 "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
//               }
//               alt="profile"
//               className="w-36 h-36 rounded-full object-cover"
//             />
//           </div>

//           <div className="flex-1">
//             <div className="flex items-center gap-4">
//               <h2 className="text-2xl font-light">{user.username}</h2>
//               <button
//                 onClick={() => navigate("/EditProfile")}
//                 className="border px-4 py-1 rounded-md text-sm font-medium"
//               >
//                 Edit Profile
//               </button>
//             </div>

//             <div className="flex gap-6 mt-4 text-sm">
//               <span>
//                 <strong>{stats.posts}</strong> posts
//               </span>
//               <span>
//                 <strong>{stats.followers}</strong> followers
//               </span>
//               <span>
//                 <strong>{stats.following}</strong> following
//               </span>
//             </div>

//             <div className="mt-4 text-sm">
//               <p className="font-medium">{user.username}</p>
//               <p className="text-gray-600">{user.bio || "No bio yet"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-12 text-sm mt-6 border-b">
//           <button className="border-b-2 border-black pb-3 font-medium">
//             POSTS
//           </button>
//         </div>

//         {/* Posts Grid */}
//         {posts.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10">No posts yet</p>
//         ) : (
//           <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
//             {posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="aspect-square cursor-pointer"
//                 onClick={() => setSelectedPost(post._id)}
//               >
//                 <img
//                   src={post.media}
//                   alt="post"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Post Modal */}
//         {selectedPost && (
//           <PostModal postId={selectedPost} onClose={() => setSelectedPost(null)} />
//         )}
//       </main>
//     </div>
//   );
// }

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

        const profileRes = await api.get(`/profile/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
        {/* Profile Header */}
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
                onClick={() => navigate("/EditProfile")}
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

        {/* Posts Grid */}
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

      {/* ✅ MODAL */}
      {selectedPostId && (
        // <PostModal
        //   postId={selectedPostId}
        //   onClose={() => setSelectedPostId(null)}
        // />
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

// --------------------
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import Sidebar from "../pages/navbar";
// import PostModal from "../components/PostModal";

// export default function ProfilePage() {
//   const { username } = useParams();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPostId, setSelectedPostId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const profileRes = await api.get(`/profile/${username}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setProfile(profileRes.data);

//         const postsRes = await api.get(
//           `/posts/user/${profileRes.data.user._id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setPosts(postsRes.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [username]);

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (!profile) return <div className="text-center mt-20">User not found</div>;

//   const { user, stats } = profile;

//   return (
//     <div className="flex min-h-screen">
//       <div className="fixed md:static w-64 h-screen bg-gray-100">
//         <Sidebar />
//       </div>

//       <main className="flex-1 px-4 md:px-10 py-8 ml-0 md:ml-64">
//         {/* PROFILE HEADER */}
//         <div className="flex gap-10 border-b pb-8">
//           <img
//             src={
//               user.profilePic ||
//               "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
//             }
//             className="w-36 h-36 rounded-full object-cover"
//             alt="profile"
//           />

//           <div>
//             <h2 className="text-2xl">{user.username}</h2>
//             <div className="flex gap-6 mt-3 text-sm">
//               <span><b>{stats.posts}</b> posts</span>
//               <span><b>{stats.followers}</b> followers</span>
//               <span><b>{stats.following}</b> following</span>
//             </div>
//             <p className="mt-3 text-sm">{user.bio}</p>
//           </div>
//         </div>

//         {/* POSTS GRID */}
//         <div className="grid grid-cols-3 gap-2 mt-6">
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="aspect-square cursor-pointer"
//               onClick={() => setSelectedPostId(post._id)}
//             >
//               <img
//                 src={post.media}
//                 className="w-full h-full object-cover"
//                 alt="post"
//               />
//             </div>
//           ))}
//         </div>
//       </main>

      {/* MODAL */}
//       {selectedPostId && (
//         <PostModal
//           postId={selectedPostId}
//           onClose={() => setSelectedPostId(null)}
//           onDelete={(id) =>
//             setPosts((prev) => prev.filter((p) => p._id !== id))
//           }
//         />
//       )}
//     </div>
//   );
// }
