import { useEffect, useState } from "react";
import { api } from "../axios";
import { FaHeart, FaRegHeart, FaComment, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/navbar";

import { socket } from "../socket"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [comment, setComment] = useState("");
  const navigate=useNavigate()

  const userId = localStorage.getItem("userId");
  
  
  useEffect(() => {
    const fetchpost = api.get("/posts").then((res) => setPosts(res.data));
  }, []);
  console.log("userId: ",userId);

//  socket connect
  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("join", userId);

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // like unlike 
  useEffect(() => {
    socket.on("post-liked", ({ postId, userId: likerId }) => {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId && !post.likes.includes(likerId)
            ? { ...post, likes: [...post.likes, likerId] }
            : post
        )
      );

      if (activePost?._id === postId) {
        setActivePost((prev) =>
          prev && !prev.likes.includes(likerId)
            ? { ...prev, likes: [...prev.likes, likerId] }
            : prev
        );
      }
    });

    socket.on("post-unliked", ({ postId, userId: likerId }) => {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((id) => id !== likerId) }
            : post
        )
      );

      if (activePost?._id === postId) {
        setActivePost((prev) =>
          prev
            ? { ...prev, likes: prev.likes.filter((id) => id !== likerId) }
            : prev
        );
      }
    });

    return () => {
      socket.off("post-liked");
      socket.off("post-unliked");
    };
  }, [activePost]);
// end of socket


  const toggleLike = async (id) => {
  const res = await api.put(`/posts/${id}/like`);

  setPosts((prev) =>
    prev.map((p) => (p._id === id ? res.data : p))
  );

  if (activePost?._id === id) {
    setActivePost(res.data);
  }
};


  
  const addComment = async () => {
  if (!comment.trim()) return;

  try {
    const res = await api.post(
      `/posts/${activePost._id}/comment`,
      { text: comment }
    );

    const updatedPost = res.data;

    // post update akkn
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );

    // keep modal open + update comments
    setActivePost(updatedPost);
    setComment("");
  } catch (err) {
    console.error(err);
  }
};

const deleteComment = async (postId, commentId) => {
  if (!window.confirm("Delete this comment?")) return;

  try {
    console.log("haloo");
    
    const res = await api.delete(
      `/posts/${postId}/comment/${commentId}`
    );

    const updatedPost = res.data;

    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );

    setActivePost(updatedPost);
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="hidden md:block fixed left-0 top-0 w-64 h-screen bg-white border-r">
        <Sidebar />
      </div>

      <main className="flex-1 ml-0 md:ml-64">
        <div className="max-w-xl mx-auto py-6 space-y-6">
          {posts.map((post) => {
            const liked = post.likes.includes(userId);

            return (
              <div key={post._id} className="border rounded bg-white">

                <div className="flex items-center p-3 gap-2">
                    <img
                        src={
                        post.user.profilePic ||
                        "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
                        }
                        onClick={() => navigate(`/user/${post.user._id}`)}
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        alt="user"
                    />

                    <b
                        onClick={() => navigate(`/user/${post.user._id}`)}
                        className="cursor-pointer hover:underline"
                    >
                        {post.user.username}
                    </b>
                    </div>

                
                <img src={post.media} className="w-full" alt="post" />

                <div className="p-3 flex gap-4 text-xl">
                  <button onClick={() => toggleLike(post._id)}>
                    {liked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>

                  <button onClick={() => setActivePost(post)}>
                    <FaComment />
                  </button>
                </div>

                <p className="px-3 pb-3 text-sm">
                  <b>{post.user.username}</b> {post.caption}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {activePost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setActivePost(null)}
        >
          <div
            className="bg-white w-96 max-h-[80vh] p-4 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold mb-3">Comments</h3>

            <div className="space-y-2 max-h-60 overflow-y-auto text-sm">
              {activePost.comments.length === 0 ? (
                <p className="text-gray-400">No comments yet</p>
              ) : (
               
                activePost.comments.map((c) => {
                  const canDelete =
                    c.user._id === userId || activePost.user._id === userId;

                  return (
                    <div
                      key={c._id}
                      className="flex justify-between items-center text-sm group"
                    >
                      <p>
                        <b
                          onClick={() => {
                            navigate(`/user/${c.user._id}`);
                            setActivePost(null);
                          }}
                          className="cursor-pointer hover:underline"
                        >
                          {c.user.username}
                        </b>{" "}
                        {c.text}
                      </p>

                      {canDelete && (
                        <button
                          onClick={() =>
                            deleteComment(activePost._id, c._id)
                          }
                          className="text-red-500 opacity-0 group-hover:opacity-100"
                        >
                          <FaTrash size={12} />
                        </button>
                      )}
                    </div>
                  );
                })


              )}
            </div>

            <div className="flex gap-2 mt-3">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border flex-1 px-2 py-1 text-sm"
                placeholder="Add comment..."
              />
              <button
                onClick={addComment}
                className="text-blue-500 font-semibold text-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
