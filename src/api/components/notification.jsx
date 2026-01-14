import { useEffect, useState } from "react";
import { api } from "../axios";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications yet</p>
      )}

      <div className="w-full space-y-4">
        {notifications.map((n) => (
          <div
            key={n._id}
            className="flex items-center gap-3 p-3 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              if (n.type === "follow") {
                navigate(`/user/${n.sender._id}`);
              } else {
                navigate(`/post/${n.post._id}`);
              }
            }}
          >
            <img
              src={n.sender.profilePic || "/avatar.png"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm">
                <b>{n.sender.username}</b>{" "}
                {n.type === "like" && "liked your post"}
                {n.type === "comment" && "commented on your post"}
                {n.type === "follow" && "started following you"}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
