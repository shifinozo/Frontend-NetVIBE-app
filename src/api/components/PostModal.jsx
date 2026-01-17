

// ---------------------------
import { useEffect, useState } from "react";
import { api } from "../axios";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket"

export default function PostModal({ postId, onClose, onDelete, onUpdate }) {
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const navigate =useNavigate()

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
        console.error("Failed to load post:", err);
      }
    };

    fetchPost();
  }, [postId, token]);

  if (!post) return null;

  
  const isOwner = post.user._id === userId;
  const isLiked = post.likes.includes(userId);

  console.log("haloooo",isOwner);
  console.log("heyyy",post.user._id,
    "useriddd:",userId);
  
  

  const toggleLike = async () => {

    try {
     
      const res = await api.put(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setPost(res.data)

   
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost(res.data);
    } catch (err) {
      console.error("Delete comment failed", err);
    }
  };



  const deletePost = async () => {
    console.log("started..");
    
    if (!window.confirm("Delete this post?")) return;

    try {
      console.log("started22..");
      const res = await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.);

      if(res.status === 200){
        console.log("successs");
        
        onDelete(postId);
        onClose();
      }else{
        console.log("something wrong...");
        
      }
      

     
    } catch (err) {
      console.error("Delete failed", err);

      if(err.response.status === 404){
        console.log("");
        
      }
    }
  };

  
  

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl h-[85vh] rounded-lg flex overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex-1 bg-black flex items-center justify-center">
          <img
            src={post.media}
            alt="post"
            className="max-w-full max-h-full object-contain"
          />
        </div>

       
        <div className="w-[380px] flex flex-col border-l">
          
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img
                src={
                  post.user.profilePic ||
                  "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
                }
                className="w-8 h-8 rounded-full object-cover"
                alt="user"
              />
              <span className="font-semibold text-sm">
                {post.user.username}
              </span>
            </div>

            {isOwner && (
              <button onClick={deletePost} className="text-red-500 text-lg">
                <FaTrash />
              </button>
            )}
          </div>

         
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {post.caption && (
              <div className="text-sm">
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
                  className="flex items-center justify-between text-sm group"
                >
                  <div>
                    <span
                      onClick={() => navigate(`/user/${c.user._id}`)}
                      className="font-semibold mr-2 cursor-pointer hover:underline"
                    >
                      {c.user.username}
                    </span>
                    {c.text}
                  </div>

                  {canDelete && (
                    <button
                      onClick={() => deleteComment(c._id)}
                      className="text-red-500 opacity-0 group-hover:opacity-100 ml-2"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              );
            })}

          </div>

          
          <div className="px-4 py-2 border-t">
            <button onClick={toggleLike} className="text-2xl">
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <div className="text-sm font-semibold mt-1">
              {post.likes.length} likes
            </div>
          </div>

          
          <div className="flex items-center border-t px-3 py-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 text-sm outline-none"
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

        
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-3xl"
        >
          &times;
        </button> */}
      </div>
    </div>
  );
}
