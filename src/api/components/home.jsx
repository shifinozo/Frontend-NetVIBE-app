// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import { FaHeart, FaRegHeart, FaComment, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../pages/navbar";

// import { socket } from "../socket"

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [activePost, setActivePost] = useState(null);
//   const [comment, setComment] = useState("");
//   const navigate=useNavigate()

//   const userId = localStorage.getItem("userId");


//   useEffect(() => {
//     const fetchpost = api.get("/posts").then((res) => setPosts(res.data));
//   }, []);
//   console.log("userId: ",userId);

// //  socket connect
//   useEffect(() => {
//     if (!userId) return;

//     socket.connect();
//     socket.emit("join", userId);

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//   // like unlike 
//   useEffect(() => {
//     socket.on("post-liked", ({ postId, userId: likerId }) => {
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === postId && !post.likes.includes(likerId)
//             ? { ...post, likes: [...post.likes, likerId] }
//             : post
//         )
//       );

//       if (activePost?._id === postId) {
//         setActivePost((prev) =>
//           prev && !prev.likes.includes(likerId)
//             ? { ...prev, likes: [...prev.likes, likerId] }
//             : prev
//         );
//       }
//     });

//     socket.on("post-unliked", ({ postId, userId: likerId }) => {
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === postId
//             ? { ...post, likes: post.likes.filter((id) => id !== likerId) }
//             : post
//         )
//       );

//       if (activePost?._id === postId) {
//         setActivePost((prev) =>
//           prev
//             ? { ...prev, likes: prev.likes.filter((id) => id !== likerId) }
//             : prev
//         );
//       }
//     });

//     return () => {
//       socket.off("post-liked");
//       socket.off("post-unliked");
//     };
//   }, [activePost]);
// // end of socket


//   const toggleLike = async (id) => {
//   const res = await api.put(`/posts/${id}/like`);

//   setPosts((prev) =>
//     prev.map((p) => (p._id === id ? res.data : p))
//   );

//   if (activePost?._id === id) {
//     setActivePost(res.data);
//   }
// };



//   const addComment = async () => {
//   if (!comment.trim()) return;

//   try {
//     const res = await api.post(
//       `/posts/${activePost._id}/comment`,
//       { text: comment }
//     );

//     const updatedPost = res.data;

//     // post update akkn
//     setPosts((prev) =>
//       prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
//     );

//     // keep modal open + update comments
//     setActivePost(updatedPost);
//     setComment("");
//   } catch (err) {
//     console.error(err);
//   }
// };

// const deleteComment = async (postId, commentId) => {
//   if (!window.confirm("Delete this comment?")) return;

//   try {
//     console.log("haloo");

//     const res = await api.delete(
//       `/posts/${postId}/comment/${commentId}`
//     );

//     const updatedPost = res.data;

//     setPosts((prev) =>
//       prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
//     );

//     setActivePost(updatedPost);
//   } catch (err) {
//     console.error(err);
//   }
// };



//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       <div className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-white border-r">
//         <Sidebar />
//       </div>

//       <main className="flex-1 ml-0 md:ml-64">
//         <div className="max-w-xl mx-auto py-6 space-y-6">
//           {posts.map((post) => {
//             const liked = post.likes.includes(userId);

//             return (
//               <div key={post._id} className="border rounded bg-white">

//                 <div className="flex items-center p-3 gap-2">
//                     <img
//                         src={
//                         post.user.profilePic ||
//                         "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
//                         }
//                         onClick={() => navigate(`/user/${post.user._id}`)}
//                         className="w-8 h-8 rounded-full object-cover cursor-pointer"
//                         alt="user"
//                     />

//                     <b
//                         onClick={() => navigate(`/user/${post.user._id}`)}
//                         className="cursor-pointer hover:underline"
//                     >
//                         {post.user.username}
//                     </b>
//                     </div>


//                 <img src={post.media} className="w-full" alt="post" />

//                 <div className="p-3 flex gap-4 text-xl">
//                   <button onClick={() => toggleLike(post._id)}>
//                     {liked ? (
//                       <FaHeart className="text-red-500" />
//                     ) : (
//                       <FaRegHeart />
//                     )}
//                   </button>

//                   <button onClick={() => setActivePost(post)}>
//                     <FaComment />
//                   </button>
//                 </div>

//                 <p className="px-3 pb-3 text-sm">
//                   <b>{post.user.username}</b> {post.caption}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {activePost && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
//           onClick={() => setActivePost(null)}
//         >
//           <div
//             className="bg-white w-96 max-h-[80vh] p-4 rounded"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="font-bold mb-3">Comments</h3>

//             <div className="space-y-2 max-h-60 overflow-y-auto text-sm">
//               {activePost.comments.length === 0 ? (
//                 <p className="text-gray-400">No comments yet</p>
//               ) : (

//                 activePost.comments.map((c) => {
//                   const canDelete =
//                     c.user._id === userId || activePost.user._id === userId;

//                   return (
//                     <div
//                       key={c._id}
//                       className="flex justify-between items-center text-sm group"
//                     >
//                       <p>
//                         <b
//                           onClick={() => {
//                             navigate(`/user/${c.user._id}`);
//                             setActivePost(null);
//                           }}
//                           className="cursor-pointer hover:underline"
//                         >
//                           {c.user.username}
//                         </b>{" "}
//                         {c.text}
//                       </p>

//                       {canDelete && (
//                         <button
//                           onClick={() =>
//                             deleteComment(activePost._id, c._id)
//                           }
//                           className="text-red-500 opacity-0 group-hover:opacity-100"
//                         >
//                           <FaTrash size={12} />
//                         </button>
//                       )}
//                     </div>
//                   );
//                 })


//               )}
//             </div>

//             <div className="flex gap-2 mt-3">
//               <input
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="border flex-1 px-2 py-1 text-sm"
//                 placeholder="Add comment..."
//               />
//               <button
//                 onClick={addComment}
//                 className="text-blue-500 font-semibold text-sm"
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { api } from "../axios";
import { FaHeart, FaRegHeart, FaComment, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/navbar";
import { socket } from "../socket";

const Caption = ({ username, caption, onUserClick }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 95;

  if (!caption) return null;

  const isLong = caption.length > maxLength;
  const displayText = expanded || !isLong
    ? caption
    : caption.slice(0, maxLength);

  return (
    <div className="px-3 md:px-4 py-1 md:py-1.5 text-sm">
      <span
        onClick={onUserClick}
        className="font-semibold mr-2 cursor-pointer hover:opacity-70"
      >
        {username}
      </span>
      <span className="text-gray-900 whitespace-pre-wrap">{displayText}</span>
      {isLong && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-gray-500 ml-1 hover:underline focus:outline-none"
        >
          ... more
        </button>
      )}
    </div>
  );
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [activePost, setActivePost] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // {postId, commentId}
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data));
  }, []);

  /* SOCKET */
  useEffect(() => {
    if (!userId) return;
    socket.connect();
    socket.emit("join", userId);
    return () => socket.disconnect();
  }, [userId]);

  useEffect(() => {
    socket.on("post-liked", ({ postId, userId: liker }) => {
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId && !p.likes.includes(liker)
            ? { ...p, likes: [...p.likes, liker] }
            : p
        )
      );
    });

    socket.on("post-unliked", ({ postId, userId: liker }) => {
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, likes: p.likes.filter((id) => id !== liker) }
            : p
        )
      );
    });

    return () => {
      socket.off("post-liked");
      socket.off("post-unliked");
    };
  }, []);

  const toggleLike = async (id) => {
    const res = await api.put(`/posts/${id}/like`);
    setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    if (activePost?._id === id) setActivePost(res.data);
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    const res = await api.post(`/posts/${activePost._id}/comment`, {
      text: comment,
    });
    setPosts((prev) =>
      prev.map((p) => (p._id === res.data._id ? res.data : p))
    );
    setActivePost(res.data);
    setComment("");
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const res = await api.delete(
        `/posts/${postId}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? res.data : p))
      );
      if (activePost && activePost._id === postId) {
        setActivePost(res.data);
      }
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">

      {/* SIDEBAR */}
      <Sidebar />

      {/* FEED */}
      <main className="flex-1 ml-0 md:ml-64 pt-16 md:pt-20 pb-20 md:pb-8">
        <div className="max-w-xl mx-auto">
          {posts.map((post) => {
            const liked = post.likes.includes(userId);

            return (
              <div
                key={post._id}
                className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 mb-3 md:mb-4"
              >
                {/* USER */}
                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3">
                  <img
                    src={post.user.profilePic || "/avatar.png"}
                    onClick={() => navigate(`/user/${post.user._id}`)}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover cursor-pointer"
                  />
                  <span
                    onClick={() => navigate(`/user/${post.user._id}`)}
                    className="font-semibold text-xs md:text-sm cursor-pointer hover:opacity-70 dark:text-gray-100"
                  >
                    {post.user.username}
                  </span>
                </div>

                {/* IMAGE */}
                <img
                  src={post.media}
                  className="w-full object-cover"
                  alt="post"
                />

                {/* ACTIONS */}
                <div className="flex items-center gap-6 px-3 md:px-4 pt-3">
                  {/* LIKE */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => toggleLike(post._id)}
                      className="hover:opacity-60 transition text-2xl"
                    >
                      {liked ? (
                        <FaHeart className="text-red-500 scale-110" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    {post.likes.length > 0 && (
                      <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {post.likes.length}
                      </span>
                    )}
                  </div>

                  {/* COMMENT */}
                  <div className="flex flex-col items-center gap-1 dark:text-gray-300">
                    <button
                      onClick={() => setActivePost(post)}
                      className="hover:opacity-60 transition text-2xl"
                    >
                      <FaComment />
                    </button>
                    {post.comments.length > 0 && (
                      <span className="text-[10px] md:text-xs font-semibold text-gray-700 dark:text-gray-400">
                        {post.comments.length}
                      </span>
                    )}
                  </div>
                </div>



                {/* CAPTION */}
                <Caption
                  username={post.user.username}
                  caption={post.caption}
                  onUserClick={() => navigate(`/user/${post.user._id}`)}
                />

                {/* VIEW ALL COMMENTS */}
                {post.comments.length > 0 && (
                  <button
                    onClick={() => setActivePost(post)}
                    className="px-3 md:px-4 pb-3 text-sm text-gray-400 hover:text-gray-500 transition block text-left w-full"
                  >
                    View all {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* COMMENTS MODAL */}
      {activePost && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setActivePost(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-xl p-5 border border-transparent dark:border-zinc-800"
          >
            <h3
              className="text-lg font-semibold mb-4 text-center
              bg-gradient-to-r from-purple-500 to-cyan-500
              bg-clip-text text-transparent"
            >
              Comments
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto text-sm pr-1 custom-scrollbar">
              {/* CAPTION AT TOP OF COMMENTS */}
              {activePost.caption && (
                <div className="flex gap-3 mb-4">
                  <img
                    src={activePost.user.profilePic || "/avatar.png"}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    alt=""
                  />
                  <div>
                    <span className="font-semibold mr-2 dark:text-gray-100">{activePost.user.username}</span>
                    <span className="text-gray-900 dark:text-gray-300 whitespace-pre-wrap">{activePost.caption}</span>
                  </div>
                </div>
              )}

              {activePost.comments.length === 0 && !activePost.caption && (
                <p className="text-gray-400 text-center py-4">
                  No comments yet
                </p>
              )}

              {activePost.comments.map((c) => {
                const canDelete =
                  c.user._id === userId ||
                  activePost.user._id === userId;

                return (
                  <div
                    key={c._id}
                    className="flex justify-between group"
                  >
                    <p className="dark:text-gray-300">
                      <b
                        onClick={() => {
                          navigate(`/user/${c.user._id}`);
                          setActivePost(null);
                        }}
                        className="cursor-pointer hover:underline mr-1 dark:text-gray-100"
                      >
                        {c.user.username}
                      </b>
                      {c.text}
                    </p>

                    {canDelete && (
                      <button
                        onClick={() => setDeleteConfirm({ postId: activePost._id, commentId: c._id })}
                        className="text-red-500 opacity-0 group-hover:opacity-100"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ADD COMMENT */}
            <div className="flex gap-2 mt-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 rounded-lg border dark:border-zinc-700
                bg-white dark:bg-zinc-800 text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={addComment}
                className="px-4 rounded-lg font-medium
                bg-gradient-to-r from-purple-500 to-cyan-500
                text-white"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 max-w-sm mx-4 border dark:border-zinc-800">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Delete Comment</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to delete this comment?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 font-medium dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteComment(deleteConfirm.postId, deleteConfirm.commentId)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
