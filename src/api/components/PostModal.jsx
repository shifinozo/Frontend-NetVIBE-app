

// // ---------------------------
// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { socket } from "../socket"

// export default function PostModal({ postId, onClose, onDelete, onUpdate }) {
//   const [post, setPost] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const navigate =useNavigate()

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");


//   useEffect(() => {
//     if (!postId) return;

//     const fetchPost = async () => {
//       try {
//         const res = await api.get(`/posts/${postId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPost(res.data);
//       } catch (err) {
//         console.error("Failed to load post:", err);
//       }
//     };

//     fetchPost();
//   }, [postId, token]);

//   if (!post) return null;


//   const isOwner = post.user._id === userId;
//   const isLiked = post.likes.includes(userId);

//   console.log("haloooo",isOwner);
//   console.log("heyyy",post.user._id,
//     "useriddd:",userId);



//   const toggleLike = async () => {

//     try {

//       const res = await api.put(
//         `/posts/${postId}/like`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       setPost(res.data)


//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addComment = async () => {
//     if (!commentText.trim()) return;

//     try {
//       const res = await api.post(
//         `/posts/${postId}/comment`,
//         { text: commentText },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPost(res.data);
//       onUpdate(res.data);
//       setCommentText("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//     const deleteComment = async (commentId) => {
//     if (!window.confirm("Delete this comment?")) return;

//     try {
//       const res = await api.delete(
//         `/posts/${postId}/comment/${commentId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setPost(res.data);
//     } catch (err) {
//       console.error("Delete comment failed", err);
//     }
//   };



//   const deletePost = async () => {
//     console.log("started..");

//     if (!window.confirm("Delete this post?")) return;

//     try {
//       console.log("started22..");
//       const res = await api.delete(`/posts/${postId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // console.log(res.);

//       if(res.status === 200){
//         console.log("successs");

//         onDelete(postId);
//         onClose();
//       }else{
//         console.log("something wrong...");

//       }



//     } catch (err) {
//       console.error("Delete failed", err);

//       if(err.response.status === 404){
//         console.log("");

//       }
//     }
//   };




//   return (
//     <div
//       className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-full max-w-4xl h-[85vh] rounded-lg flex overflow-hidden relative"
//         onClick={(e) => e.stopPropagation()}
//       >

//         <div className="flex-1 bg-black flex items-center justify-center">
//           <img
//             src={post.media}
//             alt="post"
//             className="max-w-full max-h-full object-contain"
//           />
//         </div>


//         <div className="w-[380px] flex flex-col border-l">

//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-3">
//               <img
//                 src={
//                   post.user.profilePic ||
//                   "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
//                 }
//                 className="w-8 h-8 rounded-full object-cover"
//                 alt="user"
//               />
//               <span className="font-semibold text-sm">
//                 {post.user.username}
//               </span>
//             </div>

//             {isOwner && (
//               <button onClick={deletePost} className="text-red-500 text-lg">
//                 <FaTrash />
//               </button>
//             )}
//           </div>


//           <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
//             {post.caption && (
//               <div className="text-sm">
//                 <span className="font-semibold mr-2">
//                   {post.user.username}
//                 </span>
//                 {post.caption}
//               </div>
//             )}

//           {post.comments.map((c) => {
//             if (!c.user) return null;

//               const canDelete =
//                 c.user._id === userId || post.user._id === userId;

//               return (
//                 <div
//                   key={c._id}
//                   className="flex items-center justify-between text-sm group"
//                 >
//                   <div>
//                     <span
//                       onClick={() => navigate(`/user/${c.user._id}`)}
//                       className="font-semibold mr-2 cursor-pointer hover:underline"
//                     >
//                       {c.user.username}
//                     </span>
//                     {c.text}
//                   </div>

//                   {canDelete && (
//                     <button
//                       onClick={() => deleteComment(c._id)}
//                       className="text-red-500 opacity-0 group-hover:opacity-100 ml-2"
//                     >
//                       <FaTrash size={12} />
//                     </button>
//                   )}
//                 </div>
//               );
//             })}

//           </div>


//           <div className="px-4 py-2 border-t">
//             <button onClick={toggleLike} className="text-2xl">
//               {isLiked ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </button>

//             <div className="text-sm font-semibold mt-1">
//               {post.likes.length} likes
//             </div>
//           </div>


//           <div className="flex items-center border-t px-3 py-2">
//             <input
//               type="text"
//               placeholder="Add a comment..."
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               className="flex-1 text-sm outline-none"
//             />
//             <button
//               onClick={addComment}
//               disabled={!commentText.trim()}
//               className="text-blue-500 font-semibold text-sm disabled:text-blue-300"
//             >
//               Post
//             </button>
//           </div>
//         </div>


//         {/* <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-white text-3xl"
//         >
//           &times;
//         </button> */}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../axios";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PostModal({ postId, onClose, onDelete, onUpdate }) {
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [postId, token]);

  if (!post) return null;

  const isOwner = post.user._id === userId;
  const isLiked = post.likes.includes(userId);

  const toggleLike = async () => {
    try {
      const res = await api.put(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await api.post(
        `/posts/${postId}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data);
      onUpdate(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const res = await api.delete(
        `/posts/${postId}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(postId);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-900 
        w-full max-w-4xl h-[90vh] md:h-[85vh] 
        rounded-xl shadow-xl 
        flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT – IMAGE */}
        <div className="w-full h-[40vh] md:h-auto md:flex-1 bg-black flex items-center justify-center">
          <img
            src={post.media}
            alt="post"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* RIGHT – CONTENT */}
        <div className="w-full md:w-[380px] flex flex-col border-t md:border-t-0 md:border-l dark:border-zinc-700 h-[50vh] md:h-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <img
                src={
                  post.user.profilePic ||
                  "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
                }
                className="w-9 h-9 rounded-full object-cover"
                alt="user"
              />
              <span
                onClick={() => navigate(`/profile/${post.user.username}`)}
                className="font-semibold text-sm text-gray-900 dark:text-white cursor-pointer"
              >
                {post.user.username}
              </span>
            </div>

            {isOwner && (
              <button onClick={deletePost} className="text-red-500">
                <FaTrash />
              </button>
            )}
          </div>

          {/* COMMENTS */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {post.caption && (
              <div className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold mr-2">
                  {post.user.username}
                </span>
                {post.caption}
              </div>
            )}

            {post.comments.map((c) => {
              if (!c.user) return null;

              const canDelete =
                c.user._id === userId || post.user._id === userId;

              return (
                <div
                  key={c._id}
                  className="flex justify-between text-sm group"
                >
                  <div className="text-gray-800 dark:text-gray-200">
                    <span
                      onClick={() =>
                        navigate(`/profile/${c.user.username}`)
                      }
                      className="font-semibold mr-2 cursor-pointer hover:underline"
                    >
                      {c.user.username}
                    </span>
                    {c.text}
                  </div>

                  {canDelete && (
                    <button
                      onClick={() => deleteComment(c._id)}
                      className="text-red-500 opacity-0 group-hover:opacity-100"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="px-4 py-3 border-t dark:border-zinc-700">
            <button onClick={toggleLike} className="text-2xl">
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-800 dark:text-white" />
              )}
            </button>

            <div className="text-sm font-semibold mt-1 text-gray-900 dark:text-white">
              {post.likes.length} likes
            </div>
          </div>

          {/* ADD COMMENT */}
          <div className="flex items-center border-t dark:border-zinc-700 px-3 py-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none 
              text-gray-900 dark:text-white"
            />
            <button
              onClick={addComment}
              disabled={!commentText.trim()}
              className="text-blue-500 font-semibold text-sm disabled:text-blue-300"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
