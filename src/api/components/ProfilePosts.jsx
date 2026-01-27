// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import PostModal from "./PostModal";


// export default function ProfilePosts({ userId }) {
//   const [posts, setPosts] = useState([]);
//   const [activePost, setActivePost] = useState(null);

//   useEffect(() => {
//     fetchPosts();
//   }, [userId]);

  
//   const fetchPosts = async () => {
//     try {
//       const res = await api.get(`/posts/user/${userId}`);
//       setPosts(res.data.posts || res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   if (posts.length === 0) {
//     return (
//       <div className="mt-10 text-center text-gray-400">
//         No posts yet
//       </div>
//     );
//   }

//   return (
//     <>
//   <div className="grid grid-cols-3 gap-1 mt-8">
//     {posts.map((post) => (
//       <div
//         key={post._id}
//         onClick={() => setActivePost(post)}
//         className="aspect-square cursor-pointer"
//       >
//         <img
//           src={post.media || post.image}
//           alt=""
//           className="w-full h-full object-cover"
//         />

//       </div>
//     ))}
//   </div>

//   {activePost && (
//     <PostModal
//       postId={activePost._id}
//       onClose={() => setActivePost(null)}
//       onUpdate={fetchPosts}
//     />
//   )}
// </>

//   );
// }

import { useEffect, useState } from "react";
import { api } from "../axios";
import PostModal from "./PostModal";

export default function ProfilePosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/posts/user/${userId}`);
      setPosts(res.data.posts || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-400 text-sm">
        No posts yet
      </div>
    );
  }

  return (
    <>
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-8 bg-white border rounded-lg overflow-hidden">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => setActivePost(post)}
            className="aspect-square cursor-pointer group relative"
          >
            <img
              src={post.media || post.image}
              alt="post"
              className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {activePost && (
        <PostModal
          postId={activePost._id}
          onClose={() => setActivePost(null)}
          onUpdate={fetchPosts}
        />
      )}
    </>
  );
}
