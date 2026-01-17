
// ---------------------------------------------------

import { useEffect, useState } from "react";
import { api } from "../axios";
import Sidebar from "../pages/navbar";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";


export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate =useNavigate()

useEffect(() => {

  socket.on("notification", (data) => {
    setNotifications((prev) => [data, ...prev]);
  });


  socket.on("notification-remove", ({ type, sender, post }) => {
      setNotifications((prev) =>
        prev.filter(
          (n) =>
            !(
              n.type === type &&
              n.sender?._id === sender &&
              n.post?._id === post
            )
        )
      );
    });


  return () => {
    socket.off("notification");
    socket.off("notification-remove");
  };
}, []);




  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };

  const acceptRequest = async (e, senderId) => {
    e.stopPropagation();
    await api.post(`/follow/accept/${senderId}`);
    fetchNotifications();
  };

  const rejectRequest = async (e, senderId) => {
    e.stopPropagation(); 
    await api.post(`/follow/reject/${senderId}`);
    fetchNotifications();
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block w-64 border-r">
        <Sidebar />
      </div>

      <div className="flex-1 max-w-xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>

        {notifications.length === 0 && (
          <p className="text-gray-400 text-center">No notifications</p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            className="flex items-center gap-3 p-3 border rounded mb-3"
          >
            <img
              src={n.sender.profilePic || "/avatar.png"}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
              <p className="text-sm">
                <b onClick={() => navigate(`/user/${n.sender._id}`)}
                        className="cursor-pointer hover:underline">
                          {n.sender.username}</b>{" "}
                {n.type === "follow" && n.isRequest
                  ? "requested to follow you"
                  : n.type === "follow"
                  ? "started following you"
                  : n.type === "like"
                  ? "liked your post"
                  : "commented on your post"}
              </p>
            </div>

           
            {n.type === "follow" && n.isRequest && (
              <>
                <button onClick={(e) => acceptRequest(e, n.sender._id)}>Accept</button>
                <button onClick={(e) => rejectRequest(e, n.sender._id)}>Reject</button>
              </>
            )}


            {n.post && (
              <img
                onClick={() => navigate(`/posts/${n.post._id}`)}
                src={n.post.media}
                className="w-12 h-12 object-cover rounded cursor-pointer"
              />
            )}


          </div>
        ))}
      </div>
    </div>
  );
}
